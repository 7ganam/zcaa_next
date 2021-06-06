
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.OAUTH2ClIENT);
var _ = require('lodash');


const verify_google_email_and_form = (req, res, next) => { // verifies the email used to sign in is a zc email and adds the user object to req

  async function verify() {
    const use_google_oauth = true // google cloud verification takes a long time suddenly .. they might have a problem on their servers .. disaple it for development and rely on client side verification.

    let payload = {}
    let userid = ""
    let g_picture = ""
    let zc_email = ""

    if (use_google_oauth) {
      const ticket = await client.verifyIdToken({
        idToken: req.body.google_data.tokenObj.id_token,
        audience: process.env.OAUTH2ClIENTAUDIENCE,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      payload = ticket.getPayload();
      userid = payload['sub'];
      g_picture = payload.picture;
      zc_email = payload.email;
      if (!_.has(payload, 'hd')) {
        const prod_error = new Error('google recognize this email as not a zewail city email.');
        prod_error.status = "500"
        return next(prod_error)
      }
      else if (_.has(payload, 'hd') && payload.hd != 'zewailcity.edu.eg') {
        const prod_error = new Error('google recognize this email as not a zewail city email.');
        prod_error.status = "500"
        return next(prod_error)
      }
      else if (!payload.email_verified) {
        const prod_error = new Error('google recognize this email as not verified.');
        prod_error.status = "500"
        return next(prod_error)
      }
      console.log(`zc_email`, zc_email)
    }
    else { //front end data as is 
      payload = req.body.google_data;
      userid = payload.profileObj.googleId;
      g_picture = payload.profileObj.imageUrl;
      zc_email = payload.profileObj.email;
      console.log('userid', userid)
      console.log('g_picture', g_picture)
    }


    // ------ attach user to the request -------
    req.user = {
      g_userid: userid,
      g_picture: g_picture,
      zc_email: zc_email,
      g_name: payload.name,
      first_name: req.body.form_state.first_name,
      first_name: req.body.form_state.first_name,
      last_name: req.body.form_state.last_name,
      email: req.body.form_state.email,
      exp_field: req.body.form_state.exp_field,
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
      universities: _.without(req.body.form_state.universities, undefined, null, ""),
      entities: _.without(req.body.form_state.entities, undefined, null, ""),
    }
    next();
  }

  verify().catch(console.error);

}









const verify_google_email = (req, res, next) => { // verifies the email used to log in is a zc email and adds the user object to req
  console.log(1)
  // console.log(req.body)
  const { OAuth2Client } = require('google-auth-library');
  const client = new OAuth2Client(process.env.OAUTH2ClIENT);
  async function verify() {
    const use_google_oauth = false // google cloud verification takes a long time suddenly .. they might have a problem on their servers .. disaple it for development and rely on client side verification.

    let payload = {}
    let userid = ""
    let g_picture = ""
    let zc_email = ""

    if (use_google_oauth) {
      const ticket = await client.verifyIdToken({
        idToken: req.body.google_data.tokenObj.id_token,
        audience: process.env.OAUTH2ClIENTAUDIENCE,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      payload = ticket.getPayload();
      userid = payload['sub'];
      g_picture = payload.picture;
      zc_email = payload.email;
      if (!_.has(payload, 'hd')) {
        const prod_error = new Error('google says this email isnt a zewail city email.');
        prod_error.status = "500"
        return next(prod_error)
      }
      else if (_.has(payload, 'hd') && payload.hd != 'zewailcity.edu.eg') {
        const prod_error = new Error('google says this email isnt a zewail city email 2.');
        prod_error.status = "500"
        return next(prod_error)
      }
      else if (!payload.email_verified) {
        const prod_error = new Error('google says this email isnt verified.');
        prod_error.status = "500"
        return next(prod_error)
      }
    }
    else {
      payload = req.body.google_data;
      userid = payload.profileObj.googleId;
      g_picture = payload.profileObj.imageUrl;
      zc_email = payload.profileObj.email;

    }
    console.log(1.1)
    req.user = {
      g_userid: userid,
      g_picture: g_picture,
      zc_email: zc_email,
      g_name: payload.name,

    }
    next();
  }
  verify().catch(console.error);

}














module.exports = { verify_google_email_and_form, verify_google_email };
