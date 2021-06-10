
const { dbConnect } = require('../../../utils/dbConnect')

var _ = require('lodash');


import { verify_google_user_with_form, register_user } from '../../../contollers/auth_controller'







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
                await verify_google_user_with_form(req, res, false)
                await register_user(req, res)

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