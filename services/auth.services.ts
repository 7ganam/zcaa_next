import {OAuth2Client} from 'google-auth-library';
import {has} from 'lodash';

interface UserData {
  g_userid: string;
  g_picture: string;
  zc_email: string;
  g_name: string;
}

const client = new OAuth2Client(process.env.OAUTH2ClIENT);
const audience = process.env.OAUTH2ClIENTAUDIENCE;

const validateGoogleUser = async (
  google_data: any,
  use_google_oauth: boolean
): Promise<{
  success: boolean;
  error_message: string;
  userData: UserData | null;
}> => {
  let payload = {} as any;
  let userid = '';
  let g_picture = '';
  let zc_email = '';

  if (use_google_oauth) {
    // ------------ get user data verified from google if use_google_oauth is true ---------------
    const ticket = await client.verifyIdToken({
      idToken: google_data.tokenObj.id_token,
      audience,
    });

    if (!ticket) {
      return {
        success: false,
        error_message: "Something went wrong, can't log in.",
        userData: null,
      };
    }

    payload = ticket.getPayload();
    userid = payload['sub'];
    g_picture = payload.picture;
    zc_email = payload.email;

    // ----------------------------ask google servers ---------------------------------------
    if (
      !has(payload, 'hd') &&
      process.env.NEXT_PUBLIC_APPLY_EMAIL_CHECK === 'TRUE'
    ) {
      return {
        success: false,
        error_message: "This emails doesn't belong to the organization",
        userData: null,
      };
    } else if (
      has(payload, 'hd') &&
      process.env.NEXT_PUBLIC_APPLY_EMAIL_CHECK === 'TRUE' &&
      payload.hd != process.env.NEXT_PUBLIC_ALLOWED_EMAILS
    ) {
      return {
        success: false,
        error_message:
          'google recognize this email as not a zewail city email.',
        userData: null,
      };
    } else if (!payload.email_verified) {
      return {
        success: false,
        error_message: 'google recognize this email as not verified.',
        userData: null,
      };
    }

    return {
      success: true,
      error_message: '',
      userData: {
        g_userid: userid,
        g_picture: g_picture,
        zc_email: zc_email,
        g_name: payload.name,
      },
    };
  } else {
    //-------------- if use_google_oauth not set ... use the user data sent from the front end directly -----------------
    payload = google_data;
    userid = payload.profileObj.googleId;
    g_picture = payload.profileObj.imageUrl;
    zc_email = payload.profileObj.email;

    return {
      success: true,
      error_message: '',
      userData: {
        g_userid: userid,
        g_picture: g_picture,
        zc_email: zc_email,
        g_name: payload.name,
      },
    };
  }
};

export {validateGoogleUser};
