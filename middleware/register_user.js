
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.OAUTH2ClIENT);
var _ = require('lodash');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;


const register_user = async (req, res, next) => {

    // add the json object to the database
    console.log(2)

    // -------------------- LOOK DATABASE FOR THE USER ------------------------
    try {
        user_search_result = await Users.find({ zc_email: req.user.zc_email })

    }
    catch (dev_err) {
        const prod_error = new Error('error whiling searching for user');
        prod_error.status = "500"
        return next(dev_err)
        // return next(prod_error)
    };


    console.log(3)


    if (user_search_result.length < 1 || user_search_result == undefined) { // case no user found registerd already // if the user didn't sign before register it and return succes message

        // CREATE THE USER----------------------
        let created_user;
        try {
            created_user = await Users.create(req.user)
        }
        catch (dev_err) {
            const prod_error = new Error('signing up failed, please try later.');
            prod_error.status = "500"
            return next(dev_err)
            // return next(prod_error)
        };
        console.log("created_user", created_user)


        // GENERATE TOKEN----------------------
        let token;
        let expiration_time_in_hours = 10000;//TODO: make the token expiration in the front end  ... i will leave this huge number as is now
        let expiration_date = new Date(new Date().getTime() + expiration_time_in_hours * 60 * 60 * 1000);
        let expirateion_date_string = expiration_date.toISOString();
        try {
            token = jwt.sign(
                { user: created_user },
                TOKEN_SECRET_KEY,
                { expiresIn: expiration_time_in_hours + 'h' }
            );
        } catch (dev_err) {
            const prod_error = new Error('signing up failed, please try later.');
            prod_error.status = "500"
            return next(dev_err)
            // return next(prod_error)
        }

        // SEND TOKEN AND USER RESPONSE----------------------
        res
            .status(201)
            .json({
                message: 'success',
                expirateion_date_string: expirateion_date_string,
                user: created_user,
                token: token
            });
    }
    else { // case we found user already applied before

        console.log(4)


        // GENERATE TOKEN----------------------
        let token;
        let expiration_time_in_hours = 100;//TODO: make the token expiration in the front end  ... i will leave this huge number as is now
        let expiration_date = new Date(new Date().getTime() + expiration_time_in_hours * 60 * 60 * 1000);
        let expirateion_date_string = expiration_date.toISOString();
        try {
            token = jwt.sign(
                { user: user_search_result },
                TOKEN_SECRET_KEY,
                { expiresIn: expiration_time_in_hours + 'h' }
            );
        } catch (dev_err) {
            const prod_error = new Error('signing up failed, please try later.');
            prod_error.status = "500"
            return next(dev_err)
            // return next(prod_error)
        }

        // SEND TOKEN AND USER RESPONSE----------------------
        console.log(5)

        res
            .status(201)
            .json({
                message: 'already_applied_before',
                expirateion_date_string: expirateion_date_string,
                user: user_search_result[0],
                token: token
            });
    }

}


module.exports = register_user;
