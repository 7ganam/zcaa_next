import {
  delete_post,
  fetch_all_news,
} from '../../../../controllers/news_controller';
import dbConnect from '../../../../utils/dbConnect';
var _ = require('lodash');

export default async function handler(req, res) {
  const {method} = req;

  switch (method) {
    case 'GET':
      try {
        let newsPosts = await fetch_all_news(req, res);
        res.status(400).json({success: false, message: 'no api endpoint'});
      } catch (dev_error) {
        console.log(`dev_error`, dev_error);
        return res.status(442).json({success: false});
      }
      break;
    case 'DELETE':
      try {
        console.log(`post`);
        delete_post(req, res);
      } catch (error) {
        res.status(400).json({success: false});
      }
      break;
    default:
      res.status(400).json({success: false});
      break;
  }
}
