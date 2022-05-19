import type {NextApiResponse, NextApiRequestExtended} from '../types/Type';
import ErrorResponse from '../utils/errorResponse';
import {createUser} from '../services/user.services';

const RegisterUserMW = async (
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) => {
  try {
    const created_user = await createUser(req.user);
    next();
  } catch (dev_err) {
    const user_error = new ErrorResponse(
      `sign up failed, please try again later.`,
      500
    );
    next(user_error);
  }
};

export default RegisterUserMW;
