import {fetch_user_by_zc_email} from '../../../controllers/user_controller';
import getBaseHandler from '../../../middleware/BaseHandler';
import databaseMW from '../../../middleware/databaseMW';
import VerifyTokenMW from '../../../middleware/VerifyTokenMW';

const handler = getBaseHandler()
  .use(databaseMW)
  .get(VerifyTokenMW, fetch_user_by_zc_email);

export default handler;
