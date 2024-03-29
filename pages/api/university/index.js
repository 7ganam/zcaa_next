import {fetch_all_unies} from '../../../controllers/university_controller';

export default async function handler(req, res) {
  const {method} = req;

  switch (method) {
    case 'GET':
      try {
        let unis = await fetch_all_unies(req, res);
        res.status(200).json(unis);
      } catch (dev_error) {
        console.log(`dev_error`, dev_error);
        return res
          .status(442)
          .json({success: false, message: 'no failed to fetch exp fields'});
      }
      break;
    case 'POST':
      break;
    default:
      res.status(400).json({success: false});
      break;
  }
}
