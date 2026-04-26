import type { NextApiResponse, NextApiRequestExtended } from "../types/Type";
import { validateGoogleUser } from "../services/auth.services";

async function googleAuthMW(
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Missing authorization header",
      });
    }

    let googleAccessToken = authorization.substring(7, authorization.length);

    let { success, error_message, userData } = await validateGoogleUser(
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

export { googleAuthMW };
