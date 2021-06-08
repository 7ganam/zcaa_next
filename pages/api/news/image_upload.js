
import { create_post } from '../../../contollers/news_controller'
var _ = require('lodash');

// let upload = require('../../../config/multer.config.js');
const awsWorker = require('../../../contollers/aws.controller.js');

const multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage });
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: '../../../public/uploads',
//         filename: (req, file, cb) => cb(null, file.originalname),
//     }),
// });


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

                upload.single("image")(req, {}, err => {
                    // do error handling here
                    if (err) {
                        console.log(`err`, err)
                        throw new Error('database failed to connect');


                    }
                    awsWorker.doUpload(req, res)
                })
                // res.status(200).send({})


            } catch (error) {
                res.status(500).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}



export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },

};

