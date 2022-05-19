var _ = require('lodash');
import {OAuth2Client} from 'google-auth-library';

import {register_experience_fields} from '../services/experienceField.services';
import {register_unies} from '../services/university.services';
import {register_entities} from '../services/entity.services';
import type {NextApiResponse, NextApiRequestExtended} from '../types/Type';

async function ProcessFormDataMW(
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) {
  try {
    let created_exp_field = await register_experience_fields(
      req.body.form_state.exp_field
    );

    let created_unies = await register_unies(req.body.form_state.universities);

    let created_entities = await register_entities(
      req.body.form_state.entities
    );

    //------ attach form data to the user in request -------
    req.user = {
      ...req.user,
      first_name: req.body.form_state.first_name,
      last_name: req.body.form_state.last_name,
      email: req.body.form_state.email,
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
      experience_field: created_exp_field,
      universities: created_unies,
      entities: created_entities,
    };
    next();
  } catch (error) {
    next(error);
  }
}

export default ProcessFormDataMW;
