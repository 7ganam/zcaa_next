const { dbConnect } = require("../utils/dbConnect");
const { ExperiencField } = require("../models/experienceField");
var ObjectId = require("mongodb").ObjectID;

var _ = require("lodash");

const fetch_all_experience_fields = async () => {
  await dbConnect();
  let experience_fields = [];
  experience_fields = await ExperiencField.find({});
  return experience_fields;
};

const register_experience_fields = async (experice_fields) => {
  // takes an array of objects {field_id, field_label} and returns an array of database objects of the same array ...
  // it creates any missing field_id in the database and returns the ones found already.
  // throws on errord (don't return response or catch errors here )
  const registered_exp_fields = experice_fields.map((exp_field) =>
    fetch_field_or_create_new_one(exp_field.value, exp_field.label)
  );
  const res = await Promise.all(registered_exp_fields);
  return res;
};

const fetch_field_or_create_new_one = async (field_id, field_label) => {
  // dont catch errors here .. errors should be handled in upper comps
  await dbConnect();

  let found_exp_field;
  console.log(`field_id`, field_id);
  console.log(`field_label`, field_label);
  console.log(`-------------------------`);

  if (ObjectId.isValid(field_id)) {
    // only look in the data base if the field_id is a valid mongodb id
    // -------------------- LOOK DATABASE FOR THE USER ------------------------

    found_exp_field = await ExperiencField.find({ _id: field_id });
  }

  if (found_exp_field == undefined || found_exp_field.length < 1) {
    // in some cases the field is registered but the front end fails to fetch data and sends again ..this causes a duplicate field ... this is to double check based on the value itself

    found_exp_field = await ExperiencField.find({ label: field_label });
  }

  if (found_exp_field == undefined || found_exp_field.length < 1) {
    // case no exp_field found registerd already
    let created_exp_field = create_exp_field(field_label);
    console.log(" created_exp_field ", created_exp_field);
    return created_exp_field;
  } else {
    return found_exp_field[0];
  }
};

const create_exp_field = async (field_label) => {
  // dont catch errors here .. errors should be handled in upper comps
  await dbConnect();
  let exp_field = { label: field_label };
  let created_exp_field = null;
  created_exp_field = await ExperiencField.create(exp_field);
  console.log(" created_exp_field ", created_exp_field);
  return created_exp_field;
};

export {
  create_exp_field,
  fetch_field_or_create_new_one,
  register_experience_fields,
  fetch_all_experience_fields,
};
