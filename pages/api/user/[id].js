

const { dbConnect } = require('../../../utils/dbConnect')
var _ = require('lodash');
import { fetch_user_by_id, update_user } from '../../../contollers/user_controller'
import { verify_token, attach_form_data_to_user } from '../../../middleware/auth_middleware'
export default async function handler(req, res) {
    const { method } = req
    const { id } = req.query
    await dbConnect()
    switch (method) {
        case 'GET':
            try {

                // await verify_token(req, res)
                await fetch_user_by_id(req, res, id)
                // await fetch_user(req, res, req.user.zc_email) // user controller to send jwt token to client

            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'PUT':
            try {
                console.log(`put`)
                // console.log('token', req.body.token)
                await verify_token(req, res)
                await attach_form_data_to_user(req, res)
                await update_user(req, res)
                res.status(200).json({ success: true, data: "put" })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'POST':
            try {
                console.log(`post`)
                res.status(200).json({ success: true, data: "post" })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}