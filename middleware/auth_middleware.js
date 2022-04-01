const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.OAUTH2ClIENT);
var _ = require('lodash');

const {
  register_experience_fields,
} = require('../controllers/experienceField_controller');
const {register_unies} = require('../controllers/university_controller');
const {register_entities} = require('../controllers/entity_controller');

const jwt = require('jsonwebtoken');

async function verify_zc_email_user(req, res, should_use_google_oauth) {
  //checks with google oauth if the zc email exists and attaches the google data in a user object to req

  const use_google_oauth = should_use_google_oauth; // google cloud verification takes a long time suddenly .. they might have a problem on their servers .. disable it for development and rely on client side verification.

  let payload = {};
  let userid = '';
  let g_picture = '';
  let zc_email = '';

  if (use_google_oauth) {
    // ------ get user data verified from google if use_google_oauth is true ---------------
    const ticket = await client.verifyIdToken({
      idToken: req.body.google_data.tokenObj.id_token,
      audience: process.env.OAUTH2ClIENTAUDIENCE,
    });
    if (!ticket) {
      console.log('ticket not found ');
      return;
    }
    payload = ticket.getPayload();
    userid = payload['sub'];
    g_picture = payload.picture;
    zc_email = payload.email;
    if (
      !_.has(payload, 'hd') &&
      process.env.NEXT_PUBLIC_APPLY_EMAIL_CHECK === 'TRUE'
    ) {
      res.status(400).json({
        success: false,
        message: "This emails doesn't belong to the organization",
      });
      console.log(`1`);
    } else if (
      _.has(payload, 'hd') &&
      process.env.NEXT_PUBLIC_APPLY_EMAIL_CHECK === 'TRUE' &&
      payload.hd != process.env.NEXT_PUBLIC_ALLOWED_EMAILS
    ) {
      res.status(400).json({
        success: false,
        message: 'google recognize this email as not a zewail city email.',
      });
    } else if (!payload.email_verified) {
      res.status(400).json({
        success: false,
        message: 'google recognize this email as not verified.',
      });
    }
    console.log(`zc_email`, zc_email);
  } else {
    //-------------- if use_google_oauth not set ... use the user data sent from the front end directly -----------------
    payload = req.body.google_data;
    userid = payload.profileObj.googleId;
    g_picture = payload.profileObj.imageUrl;
    zc_email = payload.profileObj.email;
  }

  console.log(1.1);
  req.user = {
    g_userid: userid,
    g_picture: g_picture,
    zc_email: zc_email,
    g_name: payload.name,
  };
}

async function attach_form_data_to_user(req, res) {
  //--------------------- check if fields of experience new or they already exists in the db --------------------------
  let created_exp_field;
  try {
    created_exp_field = await register_experience_fields(
      req.body.form_state.exp_field
    );
  } catch (error) {
    console.log(`error`, error);
    res.status(500).json({success: false});
  }

  //--------------------- check if unies  new or they already exists in the db --------------------------
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

  //--------------------- check if entites  new or they already exists in the db --------------------------
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

  console.log(req.user);
}

async function verify_token(req, res) {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.verified_user = decoded.user;
    req.user = decoded.user;
    // return res.status(200).json({ user: decoded.user });
  } catch (err) {
    return res.status(401).json({success: false});
  }
}

module.exports = {verify_zc_email_user, attach_form_data_to_user, verify_token};
