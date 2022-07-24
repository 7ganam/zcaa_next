import ErrorResponse from '../utils/errorResponse';

const {dbConnect} = require('../utils/dbConnect');
const {ExperiencField} = require('../models/experienceField');
var ObjectId = require('mongodb').ObjectID;

var _ = require('lodash');

const fetch_all_experience_fields = async () => {
  try {
    await dbConnect(); //TODO: try removing this since we already have the db middleware
    let experience_fields = [];
    experience_fields = await ExperiencField.find({});
    return experience_fields;
  } catch (error) {
    new ErrorResponse(`failed to register experience fields`, 500);
    throw ErrorResponse;
  }
};

const register_experience_fields = async (experice_fields: any) => {
  // takes an array of objects {field_id, field_label} and returns an array of database objects of the same array ...
  // it creates any missing field_id in the database and returns the ones found already.
  // throws on errors (don't return response or catch errors here )
  try {
    const registered_exp_fields = experice_fields.map((exp_field) =>
      fetch_field_or_create_new_one(exp_field.value, exp_field.label)
    );
    const res = await Promise.all(registered_exp_fields);
    return res;
  } catch (error) {
    new ErrorResponse(`failed to register experience fields`, 500);
    throw ErrorResponse;
  }
};

const fetch_field_or_create_new_one = async (field_id, field_label) => {
  // dont catch errors here .. errors should be handled in upper comps
  await dbConnect();
  let found_exp_field;

  try {
    if (ObjectId.isValid(field_id)) {
      // only look in the data base if the field_id is a valid mongodb id
      // -------------------- LOOK DATABASE FOR THE USER ------------------------
      found_exp_field = await ExperiencField.find({_id: field_id});
    }

    if (found_exp_field == undefined || found_exp_field.length < 1) {
      // in some cases the field is registered but the front end fails to fetch data and sends again
      //this causes a duplicate field ... this is to double check based on the value itself
      found_exp_field = await ExperiencField.find({label: field_label});
    }

    if (found_exp_field == undefined || found_exp_field.length < 1) {
      // case no exp_field found registered already
      let created_exp_field = create_exp_field(field_label);
      return created_exp_field;
    } else {
      return found_exp_field[0];
    }
  } catch (error) {
    new ErrorResponse(`failed to register experience field`, 500);
    throw ErrorResponse;
  }
};

const create_exp_field = async (field_label) => {
  try {
    await dbConnect();
    let exp_field = {label: field_label};
    let created_exp_field = null;
    created_exp_field = await ExperiencField.create(exp_field);
    console.log(' created_exp_field ', created_exp_field);
    return created_exp_field;
  } catch (error) {
    new ErrorResponse(`failed to create experience field`, 500);
    throw ErrorResponse;
  }
};

export {
  create_exp_field,
  fetch_field_or_create_new_one,
  register_experience_fields,
  fetch_all_experience_fields,
};
