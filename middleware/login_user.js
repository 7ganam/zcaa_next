
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.OAUTH2ClIENT);
var _ = require('lodash');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const cors = require('./cors');



const login_user = async (req, res, next) => {
    const { email, password } = req.body;

    // seach database for the same email
    let existingUser;
    try {
        existingUser = await Users.findOne({ zc_email: req.user.zc_email });
        console.log({ existingUser })
    } catch (dev_err) {
        const prod_error = new Error('Loggin in failed, please try again later.')
        prod_error.status = "500"
        return next(prod_error);
    }


    if (!existingUser) {
        return res
            .status(442)
            .json({
                message: 'Failed to login, you are not a member.',
            });
    }
    else {
        // GENERATE TOKEN----------------------
        let token;
        let expiration_time_in_hours = 10000;//TODO: make the token expiration in the front end  ... i will leave this huge number as is now
        let expiration_date = new Date(new Date().getTime() + expiration_time_in_hours * 60 * 60 * 1000);
        let expirateion_date_string = expiration_date.toISOString();
        try {
            token = jwt.sign(
                { user: existingUser },
                TOKEN_SECRET_KEY,
                { expiresIn: expiration_time_in_hours + 'h' }
            );
        } catch (dev_err) {
            const prod_error = new Error('logging in failed, please try later.');
            prod_error.status = "500"
            return next(dev_err)
            // return next(prod_error)
        }

        // SEND TOKEN AND USER RESPONSE----------------------
        console.log(5)

        res
            .status(201)
            .json({
                message: 'success',
                expirateion_date_string: expirateion_date_string,
                user: existingUser,
                token: token
            });
    }





}



module.exports = login_user;
