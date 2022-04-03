const {Users} = require('../models/users');
var _ = require('lodash');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.OAUTH2ClIENT);
const jwt = require('jsonwebtoken');
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
import type {NextApiResponse, NextApiRequestExtended} from './Type';

//@Expects: req.user.zc_email
//@Does   :
const RegisterUserMW = async (
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) => {
  // add the json object to the database
  let user_search_result;
  // -------------------- LOOK DATABASE FOR THE USER ------------------------
  try {
    user_search_result = await Users.find({zc_email: req.user.zc_email});
  } catch (dev_err) {
    console.log(`dev_err`, dev_err);
    res.status(500).json({
      success: false,
      message: 'Logging in failed, please try again later.',
    });
  }

  if (user_search_result.length < 1 || user_search_result == undefined) {
    // case no user found registered already // if the user didn't sign before register it and return success message

    // CREATE THE USER----------------------
    let created_user;
    try {
      created_user = await Users.create(req.user);
    } catch (dev_err) {
      console.log(`dev_err`, dev_err);
      res.status(500).json({
        success: false,
        message: 'Logging in failed, please try again later.',
      });
    }

    next();
  } else {
    // case we found user already applied before
    req.logInMessage = 'already_applied_before'; //TODO: remove this later and return error response then handle in front end
    next();
  }
};

export default RegisterUserMW;
