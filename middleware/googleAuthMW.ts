import {OAuth2Client} from 'google-auth-library';
import type {NextApiResponse, NextApiRequestExtended} from '../types/Type';
import {validateGoogleUser} from '../services/auth.services';

async function googleAuthMW(
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) {
  try {
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
  } catch (error) {
    next(error);
  }
}

export default googleAuthMW;
