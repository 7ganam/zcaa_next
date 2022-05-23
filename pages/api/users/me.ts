import {getUserByEmail} from '../../../controllers/user_controller';
import getBaseHandler from '../../../middleware/BaseHandler';
import databaseMW from '../../../middleware/databaseMW';
import {VerifyTokenMW, VerifyTokenMW2} from '../../../middleware/VerifyTokenMW';

const handler = getBaseHandler()
  .use(databaseMW)
  .get(VerifyTokenMW2, getUserByEmail);

export default handler;
