import { OAuth2Client } from "google-auth-library";
import { has } from "lodash";
import ErrorResponse from "../utils/errorResponse";
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
import jwt from "jsonwebtoken";

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
  let userid = "";
  let g_picture = "";
  let zc_email = "";
  if (use_google_oauth) {
    // ------------ get user data verified from google if use_google_oauth is true ---------------
    let ticket;
    try {
      ticket = await client.verifyIdToken({
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
    } catch (error) {
      new ErrorResponse(`failed to validate email`, 500);
      throw ErrorResponse;
    }

    payload = ticket.getPayload();
    userid = payload["sub"];
    g_picture = payload.picture;
    zc_email = payload.email;

    // ----------------------------ask google servers ---------------------------------------
    if (
      !has(payload, "hd") &&
      process.env.NEXT_PUBLIC_APPLY_EMAIL_CHECK === "TRUE"
    ) {
      return {
        success: false,
        error_message: "This emails doesn't belong to the organization",
        userData: null,
      };
    } else if (
      has(payload, "hd") &&
      process.env.NEXT_PUBLIC_APPLY_EMAIL_CHECK === "TRUE" &&
      payload.hd != process.env.NEXT_PUBLIC_ALLOWED_EMAILS
    ) {
      return {
        success: false,
        error_message:
          "google recognize this email as not a zewail city email.",
        userData: null,
      };
    } else if (!payload.email_verified) {
      return {
        success: false,
        error_message: "google recognize this email as not verified.",
        userData: null,
      };
    }

    return {
      success: true,
      error_message: "",
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
    userid = google_data.profileObj.googleId;
    g_picture = google_data.profileObj.imageUrl;
    zc_email = google_data.profileObj.email;

    return {
      success: true,
      error_message: "",
      userData: {
        g_userid: userid,
        g_picture: g_picture,
        zc_email: zc_email,
        g_name: google_data.name,
      },
    };
  }
};

async function fetchInfo(googleAccessToken) {
  //get user info from google apis ... it requires the access token
  const data = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${googleAccessToken}`,
      }),
    }
  );
  let data2 = await data.json();
  return data2;
}

const validateGoogleUser2 = async (
  // validateGoogleUser2 depends on access token not idtoken..access token doesn't have user info but it can be used to access the user info
  googleAccessToken: string
): Promise<{
  success: boolean;
  error_message: string;
  userData: UserData | null;
}> => {
  let payload = {} as any;
  let userid = "";
  let g_picture = "";
  let zc_email = "";
  // ------------use the access token to get the user data from google ---------------
  let google_data;
  try {
    google_data = await fetchInfo(googleAccessToken);

    if (!google_data) {
      return {
        success: false,
        error_message: "Something went wrong, can't log in.",
        userData: null,
      };
    }
  } catch (error) {
    console.log("error", error);
    new ErrorResponse(`failed to validate email`, 500);
    throw ErrorResponse;
  }

  payload = google_data;
  userid = google_data.id;
  g_picture = google_data.picture;
  zc_email = google_data.email;

  // ----------------------------ask google servers ---------------------------------------
  if (
    !has(google_data, "hd") &&
    process.env.NEXT_PUBLIC_APPLY_EMAIL_CHECK === "TRUE"
  ) {
    return {
      success: false,
      error_message: "This emails doesn't belong to the organization",
      userData: null,
    };
  } else if (
    has(google_data, "hd") &&
    process.env.NEXT_PUBLIC_APPLY_EMAIL_CHECK === "TRUE" &&
    google_data.hd != process.env.NEXT_PUBLIC_ALLOWED_EMAILS
  ) {
    return {
      success: false,
      error_message: "google recognize this email as not a zewail city email.",
      userData: null,
    };
  } else if (!google_data.verified_email) {
    return {
      success: false,
      error_message: "google recognize this email as not verified.",
      userData: null,
    };
  }

  return {
    success: true,
    error_message: "",
    userData: {
      g_userid: userid,
      g_picture: g_picture,
      zc_email: zc_email,
      g_name: payload.name,
    },
  };
};

const createToken = async (user) => {
  let token;
  let expiration_time_in_hours = 500; //TODO: make the token expiration in the front end  ... i will leave this huge number as is now
  try {
    token = jwt.sign({ user: user }, TOKEN_SECRET_KEY, {
      expiresIn: expiration_time_in_hours + "h",
    });
    return { token };
  } catch (dev_err) {
    // eslint-disable-next-line no-console
    console.log("token error", dev_err);
    new ErrorResponse(`failed to create token`, 500);
    throw ErrorResponse;
  }
};

export { validateGoogleUser, validateGoogleUser2, createToken };
