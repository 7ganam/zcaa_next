var _ = require("lodash");
import { OAuth2Client } from "google-auth-library";

import { register_experience_fields } from "../services/experienceField.services";
import { register_unies } from "../services/university.services";
import { register_entities } from "../services/entity.services";
import type { NextApiResponse, NextApiRequestExtended } from "../types/Type";

async function ProcessFormDataMW(
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) {
  try {
    let created_exp_field = await register_experience_fields(
      req.body.formData.exp_field
    );

    let created_unies = await register_unies(req.body.formData.universities);

    let created_entities = await register_entities(req.body.formData.entities);

    //------ attach form data to the user in request -------
    req.user = {
      ...req.user,
      first_name: req.body.formData.first_name,
      last_name: req.body.formData.last_name,
      email: req.body.formData.email,
      new_exp_field: req.body.formData.new_exp_field,
      residency: req.body.formData.residency,
      birth_date: req.body.formData.birth_date,
      content: req.body.formData.content,
      phone: req.body.formData.phone,
      birth_day: req.body.formData.birth_day,
      birth_year: req.body.formData.birth_year,
      address: req.body.formData.address,
      zc_id: req.body.formData.zc_id,
      grad_year: req.body.formData.grad_year,
      major: req.body.formData.major,
      minor: req.body.formData.minor,
      other_undergraduate_data: req.body.formData.other_undergraduate_data,
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
