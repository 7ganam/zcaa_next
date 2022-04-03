import {OAuth2Client} from 'google-auth-library';
import jwt from 'jsonwebtoken';
import {Users} from '../models/users';
import type {NextApiResponse, NextApiRequestExtended} from './Type';
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

//@expects: req.user.zc_email
//@does   : sends token to client
const LoginMW = async (
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) => {
  // search database for the same email------------------------
  let existingUser;
  try {
    existingUser = await Users.findOne({zc_email: req.user.zc_email});
  } catch (dev_err) {
    res.status(500).json({
      success: false,
      message: 'Logging in failed, please try again later.',
    });
  }
  if (!existingUser) {
    return res.status(442).json({
      success: false,
      message: 'Failed to login, you are not a member.',
    });
  } else {
    // GENERATE TOKEN----------------------
    let token;
    let expiration_time_in_hours = 500; //TODO: make the token expiration in the front end  ... i will leave this huge number as is now
    let expiration_date = new Date(
      new Date().getTime() + expiration_time_in_hours * 60 * 60 * 1000
    );
    let expirateion_date_string = expiration_date.toISOString();
    try {
      token = jwt.sign({user: existingUser}, TOKEN_SECRET_KEY, {
        expiresIn: expiration_time_in_hours + 'h',
      });
    } catch (dev_err) {
      res.status(500).json({
        success: false,
        message: 'Logging in failed, please try again later.',
      });
    }

    // SEND TOKEN AND USER RESPONSE----------------------
    res.status(201).json({
      message: req?.logInMessage ? req?.logInMessage : 'success',
      expirateion_date_string: expirateion_date_string,
      user: existingUser,
      token: token,
    });
  }
};

export default LoginMW;
