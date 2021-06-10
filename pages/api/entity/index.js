
import { fetch_all_entities } from '../../../contollers/entity_controller'
var _ = require('lodash');



import getConfig from 'next/config'






export default async function handler(req, res) {
    const { method } = req


    switch (method) {
        case 'GET':
            try {




                let entities = await fetch_all_entities(req, res);
                res.status(200).json(entities)






            } catch (dev_error) {

                console.log(`dev_error`, dev_error)
                return res.status(442).json({ success: false, message: 'no failed to fetch exp fields' });

            }
            break
        case 'POST':
            try {






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
