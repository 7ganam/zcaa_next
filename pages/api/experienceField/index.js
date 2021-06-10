
import { fetch_all_experience_fields } from '../../../contollers/experienceField_controller'
import dbConnect from '../../../utils/dbConnect'
var _ = require('lodash');










export default async function handler(req, res) {
    const { method } = req


    switch (method) {
        case 'GET':
            try {

                let experience_fields = await fetch_all_experience_fields(req, res);
                res.status(200).json(experience_fields)

            } catch (dev_error) {

                console.log(`dev_error`, dev_error)
                return res.status(442).json({ success: false, message: 'no failed to fetch exp fields' });

            }
            break
        case 'POST':
            try {

                console.log(`post`)
                res.status(400).json({ success: false, data: "get" })

            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}
