import type { NextApiResponse, NextApiRequestExtended } from "../types/Type";
import { validateGoogleUser } from "../services/auth.services";
import { validateGoogleUser2 } from "../services/auth.services";

async function googleAuthMW(
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) {
  try {
    const use_google_oauth = true; // for testing purposes we cam set this to false
    let { success, error_message, userData } = await validateGoogleUser(
      req.body.google_data,
      use_google_oauth
    );
    if (!success) {
      return res.status(400).json({
        success: false,
        message: error_message,
      });
    }
    req.user = userData;
    return next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("auth error", error);
    next(error);
  }
}

async function googleAuthMW2(
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) {
  try {
    let googleAccessToken = req.headers.authorization.substring(
      7,
      req.headers.authorization.length
    );

    let { success, error_message, userData } = await validateGoogleUser2(
      googleAccessToken
    );
    if (!success) {
      return res.status(400).json({
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

export { googleAuthMW2, googleAuthMW };
