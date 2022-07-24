import {
  fetch_user_by_id,
  getAllUsers,
  fetch_user_by_zc_email,
} from "../services/user.services";
const { Users } = require("../models/users");

const getUser = async (req, res, next) => {
  const { id } = req.query;
  try {
    let existingUser = await fetch_user_by_id(id);
    if (!existingUser) {
      return res
        .status(442)
        .json({ success: false, message: "Failed to find user" });
    } else {
      res.status(200).json({ user: existingUser, message: "success" });
    }
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    let users = await getAllUsers();

    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    let existingUser = await fetch_user_by_zc_email(req.user.zc_email);
    if (!existingUser) {
      return res
        .status(442)
        .json({ success: false, error: "Failed to find user", data: null });
    } else {
      res
        .status(200)
        .json({ data: existingUser, message: "success", error: null });
    }
  } catch (dev_err) {
    next(dev_err);
  }
};

const update_user = async (req, res) => {
  let verified_user_with_form_data = req.user;

  // -------------------- LOOK DATABASE FOR THE USER ------------------------
  let user_search_result;
  try {
    // user_search_result = await Users.find({ zc_email: verified_user_with_form_data.zc_email });
    user_search_result = await Users.findById(verified_user_with_form_data._id);
  } catch (dev_err) {
    // eslint-disable-next-line no-console
    console.log(`dev_err`, dev_err);
    res.status(500).json({
      success: false,
      message: "Logging in failed, please try again later.",
    });
  }

  if (!user_search_result) {
    res
      .status(403)
      .json({ success: false, message: "this zc_email is not registered" });
  }

  try {
    let updated_user = await Users.findByIdAndUpdate(
      verified_user_with_form_data._id,
      verified_user_with_form_data,
      { new: false }
    );
    updated_user.save();
    req.user = updated_user;
    // res.status(200).json({ success: true, data: updated_user });
  } catch (dev_err) {
    // eslint-disable-next-line no-console
    console.log(`dev_err`, dev_err);
    res.status(500).json({
      success: false,
      message: "update in failed, please try again later.",
    });
  }
};

export { getUser, update_user, getUserByEmail, getUsers };
