import {getUserByEmail} from '../../../controllers/user_controller';
import getBaseHandler from '../../../middleware/BaseHandler';
import databaseMW from '../../../middleware/databaseMW';
import VerifyTokenMW from '../../../middleware/VerifyTokenMW';

const handler = getBaseHandler()
  .use(databaseMW)
  .get(VerifyTokenMW, getUserByEmail);

export default handler;
