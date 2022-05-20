import type {NextApiResponse, NextApiRequestExtended} from '../types/Type';
import {fetch_user_by_zc_email} from '../services/user.services';
import {createToken} from '../services/auth.services';
import ErrorResponse from '../utils/errorResponse';

const Login = async (
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) => {
  try {
    let existingUser = await fetch_user_by_zc_email(req.user.zc_email);
    if (!existingUser || existingUser?.length === 0) {
      return res.status(442).json({
        success: false,
        message: 'Failed to login, you are not a member.',
      });
    }

    console.log('existingUser', existingUser);
    // GENERATE TOKEN----------------------
    let {token, expirateion_date_string} = await createToken(existingUser);

    // SEND TOKEN AND USER RESPONSE----------------------
    res.status(201).json({
      message: 'success',
      expirateion_date_string: expirateion_date_string,
      user: existingUser,
      token: token,
    });
  } catch (dev_err) {
    const user_error = new ErrorResponse(
      `Logging in failed, please try again later`,
      500
    );
    next(user_error);
  }
};

export default Login;
