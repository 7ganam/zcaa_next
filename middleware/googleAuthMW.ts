import {OAuth2Client} from 'google-auth-library';
import {has} from 'lodash';
import type {NextApiResponse, NextApiRequestExtended} from './Type';

//checks with google oauth if the zc email exists and attaches the google data in a user object to req
//expects: req.body.google_data.tokenOjb
//does   : attach user to req
const client = new OAuth2Client(process.env.OAUTH2ClIENT);
async function googleAuthMW(
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) {
  const use_google_oauth = true; // for testing purposes we cam set this to false

  let payload = {} as any;
  let userid = '';
  let g_picture = '';
  let zc_email = '';

  if (use_google_oauth) {
    // ------------ get user data verified from google if use_google_oauth is true ---------------
    const ticket = await client.verifyIdToken({
      idToken: req.body.google_data.tokenObj.id_token,
      audience: process.env.OAUTH2ClIENTAUDIENCE,
    });

    if (!ticket) {
      res.status(400).json({
        success: false,
        message: "Something went wrong, can't log in.",
      });
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
      res.status(400).json({
        success: false,
        message: "This emails doesn't belong to the organization",
      });
    } else if (
      has(payload, 'hd') &&
      process.env.NEXT_PUBLIC_APPLY_EMAIL_CHECK === 'TRUE' &&
      payload.hd != process.env.NEXT_PUBLIC_ALLOWED_EMAILS
    ) {
      res.status(400).json({
        success: false,
        message: 'google recognize this email as not a zewail city email.',
      });
    } else if (!payload.email_verified) {
      res.status(400).json({
        success: false,
        message: 'google recognize this email as not verified.',
      });
    }

    req.user = {
      g_userid: userid,
      g_picture: g_picture,
      zc_email: zc_email,
      g_name: payload.name,
    };
    return next();
  } else {
    //-------------- if use_google_oauth not set ... use the user data sent from the front end directly -----------------
    payload = req.body.google_data;
    userid = payload.profileObj.googleId;
    g_picture = payload.profileObj.imageUrl;
    zc_email = payload.profileObj.email;
    console.log(1.2);
    req.user = {
      g_userid: userid,
      g_picture: g_picture,
      zc_email: zc_email,
      g_name: payload.name,
    };
    return next();
  }
}

export default googleAuthMW;
