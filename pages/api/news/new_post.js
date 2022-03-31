
import { create_post } from '../../../controllers/news_controller'
import dbConnect from '../../../utils/dbConnect'
var _ = require('lodash');




export default async function handler(req, res) {
    const { method } = req
    console.log(`------------`)

    switch (method) {
        case 'GET':
            try {
                return res.status(442).json({ success: false, message: 'endpoint not found' });
            } catch (dev_error) {
                console.log(`dev_error`, dev_error)
                return res.status(442).json({ success: false, message: 'no news found in db' });
            }
            break
        case 'POST':
            try {
                console.log(`post`)
                create_post(req, res)
            } catch (error) {
                res.status(500).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}
