import {OAuth2Client} from 'google-auth-library';
import {has} from 'lodash';
import type {NextApiResponse, NextApiRequestExtended} from './Type';
import {validateGoogleUser} from '../services/auth.services';

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

  let {success, error_message, userData} = await validateGoogleUser(
    req.body.google_data,
    use_google_oauth
  );

  if (!success) {
    res.status(400).json({
      success: false,
      message: error_message,
    });
  }

  req.user = userData;
  return next();
}

export default googleAuthMW;
