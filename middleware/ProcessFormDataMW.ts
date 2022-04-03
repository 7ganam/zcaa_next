var _ = require('lodash');
import {OAuth2Client} from 'google-auth-library';

import {register_experience_fields} from '../controllers/experienceField_controller';
import {register_unies} from '../controllers/university_controller';
import {register_entities} from '../controllers/entity_controller';
import type {NextApiResponse, NextApiRequestExtended} from './Type';

//@Expects: req.body.form_state
//@Does   : checks form data .. create db entries for new (unies,experienceFields,Entities) and attache the form data to req.user
async function ProcessFormDataMW(
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) {
  //--------------------- check if fields of experience new or they already exist in the db --------------------------
  let created_exp_field;
  try {
    created_exp_field = await register_experience_fields(
      req.body.form_state.exp_field
    );
  } catch (error) {
    console.log(`error`, error);
    res.status(500).json({success: false});
  }

  //--------------------- check if unies  new or they already exist in the db --------------------------
  let cleaned_unies = _.without(
    req.body.form_state.universities,
    undefined,
    null,
    ''
  );

  let cleaned_unies2 = cleaned_unies.filter((uni) => uni.uni_name); // remove any empty entries
  let created_unies;
  try {
    created_unies = await register_unies(cleaned_unies2);
  } catch (error) {
    console.log(`error`, error);
    res.status(500).json({success: false});
  }

  //--------------------- check if entities  new or they already exists in the db --------------------------
  let cleaned_entities = _.without(
    req.body.form_state.entities,
    undefined,
    null,
    ''
  );
  let cleaned_entities2 = cleaned_entities.filter(
    (entity) => entity.entity_name
  ); // remove any empty entries
  let created_entities;
  try {
    created_entities = await register_entities(cleaned_entities2);
  } catch (error) {
    console.log(`error`, error);
    res.status(500).json({success: false});
  }

  //------ attach form data to the user in request -------
  req.user = {
    ...req.user,
    first_name: req.body.form_state.first_name,
    last_name: req.body.form_state.last_name,
    email: req.body.form_state.email,
    experience_field: created_exp_field,
    new_exp_field: req.body.form_state.new_exp_field,
    residency: req.body.form_state.residency,
    birth_date: req.body.form_state.birth_date,
    content: req.body.form_state.content,
    phone: req.body.form_state.phone,
    birth_day: req.body.form_state.birth_day,
    birth_year: req.body.form_state.birth_year,
    address: req.body.form_state.address,
    zc_id: req.body.form_state.zc_id,
    grad_year: req.body.form_state.grad_year,
    major: req.body.form_state.major,
    minor: req.body.form_state.minor,
    other_undergraduate_data: req.body.form_state.other_undergraduate_data,
    universities: created_unies,
    entities: created_entities,
  };
  next();
}

export default ProcessFormDataMW;
