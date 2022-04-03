import getBaseHandler from '../../../middleware/BaseHandler';
import databaseMW from '../../../middleware/databaseMW';
import {fetch_all_entities} from '../../../controllers/entity_controller';

const handler = getBaseHandler()
  .use(databaseMW)
  .get(async (req, res) => {
    let entities = await fetch_all_entities();
    res.status(200).json({entities});
  });

export default handler;
