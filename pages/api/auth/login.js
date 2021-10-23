

const { dbConnect } = require('../../../utils/dbConnect')
var _ = require('lodash');


import { login_user } from '../../../contollers/user_controller'
const { verify_zc_email_user } = require('../../../middleware/auth_middleware')





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
                await verify_zc_email_user(req, res, true) // middleware to check if zc email exists and attach user data to req
                await login_user(req, res) // user controller to send jwt token to client

            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}
