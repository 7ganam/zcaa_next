import ErrorResponse from "../utils/errorResponse";
import logger from "../utils/logger/logger";
var _ = require("lodash");
const { Users } = require("../models/users");

var _ = require("lodash");

const fetch_user_by_id = async (id: string) => {
  let existingUser;
  try {
    existingUser = await Users.findById(id)
      .populate({
        path: "universities",
        populate: {
          path: "uni_ref",
          model: "University",
        },
      })
      .populate({
        path: "entities",
        populate: {
          path: "entity_ref",
          model: "Entity",
        },
      })
      .populate("experience_field");
    return existingUser;
  } catch (error) {
    new ErrorResponse(`failed to fetch user by id`, 500);
    throw ErrorResponse;
  }
};

const fetch_user_by_zc_email = async (zc_email) => {
  logger.info("getting user with email: ", zc_email);
  let existingUser;
  try {
    existingUser = await Users.find({ zc_email: zc_email })
      .populate({
        path: "universities",
        populate: {
          path: "uni_ref",
          model: "University",
        },
      })
      .populate({
        path: "entities",
        populate: {
          path: "entity_ref",
          model: "Entity",
        },
      })
      .populate("experience_field");
    logger.info("existingUser: ", existingUser);
    return existingUser[0];
  } catch (error) {
    console.log("zc email error", error);
    new ErrorResponse(`failed to fetch user by zc-email`, 500);
    throw ErrorResponse;
  }
};

const createUser = async (user) => {
  logger.info("creating user: ", user);
  let created_user;
  try {
    created_user = await Users.create(user);
  } catch (dev_err) {
    new ErrorResponse(`failed to create user`, 500);
    throw ErrorResponse;
  }
};

const getAllUsers = async () => {
  try {
    const users = await Users.find()
      .populate("experience_field")
      .populate("universities.uni_ref")
      .exec();
    return users;
  } catch (error) {
    console.log("getAllUsers error", error);
    new ErrorResponse(`failed to fetch users`, 500);
    throw ErrorResponse;
  }
};

export { fetch_user_by_id, fetch_user_by_zc_email, createUser, getAllUsers };
