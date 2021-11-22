var _ = require('lodash');
var ObjectId = require('mongodb').ObjectID;


const { dbConnect } = require('../utils/dbConnect');
const { Users } = require('../models/users');




var _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.OAUTH2ClIENT);


const jwt = require('jsonwebtoken');
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;






const login_user = async (req, res, login_message = 'success') => {

    // seach database for the same email------------------------
    let existingUser;
    try {
        existingUser = await Users.findOne({ zc_email: req.user.zc_email });
        console.log({ existingUser })
    } catch (dev_err) {
        console.log(`dev_err`, dev_err)
        res.status(500).json({ success: false, message: 'Loggin in failed, please try again later.' })
    }

    if (!existingUser) {
        return res.status(442).json({ success: false, message: 'Failed to login, you are not a member.' });
    }
    else {
        // GENERATE TOKEN----------------------
        let token;
        let expiration_time_in_hours = 500;//TODO: make the token expiration in the front end  ... i will leave this huge number as is now
        let expiration_date = new Date(new Date().getTime() + expiration_time_in_hours * 60 * 60 * 1000);
        let expirateion_date_string = expiration_date.toISOString();
        try {
            token = jwt.sign(
                { user: existingUser },
                TOKEN_SECRET_KEY,
                { expiresIn: expiration_time_in_hours + 'h' }
            );
        } catch (dev_err) {
            console.log(`dev_err`, dev_err)
            res.status(500).json({ success: false, message: 'Loggin in failed, please try again later.' })

        }

        // SEND TOKEN AND USER RESPONSE----------------------
        res
            .status(201)
            .json({
                message: login_message,
                expirateion_date_string: expirateion_date_string,
                user: existingUser,
                token: token
            });
    }





}


const register_user = async (req, res) => {

    // add the json object to the database
    let user_search_result;
    // -------------------- LOOK DATABASE FOR THE USER ------------------------
    try {
        user_search_result = await Users.find({ zc_email: req.user.zc_email })
    }
    catch (dev_err) {
        console.log(`dev_err`, dev_err)
        res.status(500).json({ success: false, message: 'Loggin in failed, please try again later.' })
    };



    if (user_search_result.length < 1 || user_search_result == undefined) { // case no user found registerd already // if the user didn't sign before register it and return success message

        // CREATE THE USER----------------------
        let created_user;
        try {
            created_user = await Users.create(req.user)
        }
        catch (dev_err) {
            console.log(`dev_err`, dev_err)
            res.status(500).json({ success: false, message: 'Loggin in failed, please try again later.' })
        };

        console.log("created_user", created_user)

        // LOG IN THE USER
        login_user(req, res)

    }
    else { // case we found user already applied before

        console.log(4)
        // LOG IN THE USER
        login_user(req, res, 'already_applied_before')

    }

}



const fetch_user_by_id = async (req, res, user_mongo_id) => {


    let existingUser;
    try {
        existingUser = await Users.findById(user_mongo_id).populate({
            path: 'universities',
            populate: {
                path: 'uni_ref',
                model: 'University'
            }
        }).populate({
            path: 'entities',
            populate: {
                path: 'entity_ref',
                model: 'Entity'
            }
        }).populate('experience_field');
        console.log({ existingUser })
    } catch (dev_err) {
        console.log(`dev_err`, dev_err)
        res.status(500).json({ success: false, message: 'Loggin in failed, please try again later.' })
    }


    if (!existingUser) {
        return res.status(442).json({ success: false, message: 'Failed to find user' });
    }
    else {
        res.status(200).json({ user: existingUser, message: 'success' })
    }



}


const update_user = async (req, res) => {
    let verfied_user_with_form_data = req.user;
    let new_user_data = req.body.form_state;




    // -------------------- LOOK DATABASE FOR THE USER ------------------------
    let user_search_result;
    try {
        // user_search_result = await Users.find({ zc_email: verfied_user_with_form_data.zc_email });
        user_search_result = await Users.findById(verfied_user_with_form_data._id)
        console.log(`user_search_result`, user_search_result)
    }
    catch (dev_err) {
        console.log(`dev_err`, dev_err)
        res.status(500).json({ success: false, message: 'Loggin in failed, please try again later.' })
    };
    console.log(`user_search_result`, user_search_result)

    if (!user_search_result) {
        res.status(403).json({ success: false, message: 'this zc_email is not regitered' })
    }
    else {

    }

    try {
        let updated_user = await Users.findByIdAndUpdate(verfied_user_with_form_data._id, verfied_user_with_form_data, { new: false });
        updated_user.save();
        res.status(200).json({ success: true, data: updated_user });
    } catch (dev_err) {
        console.log(`dev_err`, dev_err)
        res.status(500).json({ success: false, message: 'update in failed, please try again later.' })
    };


}

export { login_user, register_user, fetch_user_by_id, update_user }