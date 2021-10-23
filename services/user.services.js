const { dbConnect } = require('../utils/dbConnect');
const { Users } = require('../models/users');
const { Entity } = require('../models/entity');

const { fetch_field_or_create_new_one, register_experience_fields } = require('../contollers/experienceField_controller')
const { fetch_all_unies, register_unies } = require('../contollers/university_controller')
const { fetch_all_entities, register_entities } = require('../contollers/entity_controller')



var _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.OAUTH2ClIENT);


const jwt = require('jsonwebtoken');
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
