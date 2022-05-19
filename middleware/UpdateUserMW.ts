const {Users} = require('../models/users');
var _ = require('lodash');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.OAUTH2ClIENT);
const jwt = require('jsonwebtoken');
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
import type {NextApiResponse, NextApiRequestExtended} from '../types/Type';

//@Expects: req.user.zc_email
//@Does   :
const UpdateUserMW = async (
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) => {
  let verified_user_with_form_data = req.user;
  let new_user_data = req.body.form_state;

  // -------------------- LOOK DATABASE FOR THE USER ------------------------
  let user_search_result;
  try {
    // user_search_result = await Users.find({ zc_email: verified_user_with_form_data.zc_email });
    user_search_result = await Users.findById(verified_user_with_form_data._id);
    console.log(`user_search_result`, user_search_result);
  } catch (dev_err) {
    console.log(`dev_err`, dev_err);
    res.status(500).json({
      success: false,
      message: 'Logging in failed, please try again later.',
    });
  }

  if (!user_search_result) {
    res
      .status(403)
      .json({success: false, message: 'this zc_email is not registered'});
  } else {
  }

  try {
    let updated_user = await Users.findByIdAndUpdate(
      verified_user_with_form_data._id,
      verified_user_with_form_data,
      {new: false}
    );
    updated_user.save();
    req.user = updated_user;
    next();
    // res.status(200).json({ success: true, data: updated_user });
  } catch (dev_err) {
    console.log(`dev_err`, dev_err);
    res.status(500).json({
      success: false,
      message: 'update in failed, please try again later.',
    });
  }
};

export default UpdateUserMW;
