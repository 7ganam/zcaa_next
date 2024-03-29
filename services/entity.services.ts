import ErrorResponse from "../utils/errorResponse";
import logger from "../utils/logger/logger";
const { dbConnect } = require("../utils/dbConnect");
const { Entity } = require("../models/entity");

var _ = require("lodash");
var ObjectId = require("mongodb").ObjectID;

const fetch_all_entities = async () => {
  await dbConnect();
  let unies = [];
  unies = await Entity.find({});
  return unies;
};

const register_entities = async (entities) => {
  try {
    let cleaned_entities = _.without(entities, undefined, null, "");
    let cleaned_entities2 = cleaned_entities.filter(
      (entity) => entity.entity_name
    ); // remove any empty entries

    for (let entity of cleaned_entities2) {
      let fetched_entity = await fetch_entity_or_create_new_one(
        entity.entity_name.value,
        entity.entity_name.label
      );

      entity.entity_ref = fetched_entity;
    }

    return cleaned_entities2;
  } catch (error) {
    new ErrorResponse(`failed to register experience entities`, 500);
    throw ErrorResponse;
  }
};

const fetch_entity_or_create_new_one = async (entity_id, entity_label) => {
  try {
    // dont catch errors here .. errors should be handled in upper comps
    await dbConnect();
    let found_entity;

    if (ObjectId.isValid(entity_id)) {
      // only look in the data base if the entity_id is a valid mongodb id
      // -------------------- LOOK DATABASE FOR THE USER ------------------------

      found_entity = await Entity.find({ _id: entity_id });
    }

    if (found_entity == undefined || found_entity.length < 1) {
      // in some cases the entity is registered but the front end fails to fetch data and sends again
      //this causes a duplicate entity ... this is to double check based on the value itself

      found_entity = await Entity.find({ name: entity_label });
    }

    if (found_entity == undefined || found_entity.length < 1) {
      // case no entity found registered already
      let created_entity = create_entity(entity_label);
      return created_entity;
    } else {
      return found_entity[0];
    }
  } catch (error) {
    new ErrorResponse(`failed to register experience entity`, 500);
    throw ErrorResponse;
  }
};

const create_entity = async (entity_label) => {
  try {
    // dont catch errors here .. errors should be handled in upper comps
    await dbConnect();
    let entity = { name: entity_label };
    let created_entity = null;
    created_entity = await Entity.create(entity);
    return created_entity;
  } catch (error) {
    new ErrorResponse(`failed to register create entity`, 500);
    throw ErrorResponse;
  }
};

export { fetch_all_entities, register_entities };
