
const { dbConnect } = require('../../../utils/dbConnect')
const { verify_zc_email_user, attach_form_data_to_user } = require('../../../middleware/auth_middleware')
var _ = require('lodash');


import { register_user } from '../../../contollers/user_controller'







export default async function handler(req, res) {
    const { method } = req

    await dbConnect()
    switch (method) {
        case 'GET':
            try {
                console.log(`get`)
                res.status(200).json({ success: true, data: "get" })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {

                console.log(`post`)

                await verify_zc_email_user(req, res, false) // middleware to check if zc email exists and attach user data to req
                await attach_form_data_to_user(req, res) // middleware to check extract form data + create any new (uni - exp filed - entity ) and attach data to the user object
                await register_user(req, res) // adding the user to the db

            } catch (error) {
                console.log(`error`, error)
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}
