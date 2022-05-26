import type { NextApiResponse, NextApiRequestExtended } from "../types/Type";
import { fetch_user_by_zc_email } from "../services/user.services";

async function BreakIfUserExistsMW(
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) {
  try {
    let existingUser = await fetch_user_by_zc_email(req.user.zc_email);

    if (existingUser) {
      return res.status(401).json({
        success: false,
        error: "already_applied_before",
        data: null,
        message: "already_applied_before",
      });
    }

    return next();
  } catch (error) {
    next(error);
  }
}

export default BreakIfUserExistsMW;
