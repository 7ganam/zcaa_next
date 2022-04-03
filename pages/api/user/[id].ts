import {fetch_user_by_id_2} from '../../../controllers/user_controller';
import getBaseHandler from '../../../middleware/BaseHandler';
import ProcessFormDataMW from '../../../middleware/ProcessFormDataMW';
import databaseMW from '../../../middleware/databaseMW';
import VerifyTokenMW from '../../../middleware/VerifyTokenMW';
import UpdateUserMW from '../../../middleware/UpdateUserMW';
import LoginMW from '../../../middleware/LoginMW';

const handler = getBaseHandler()
  .use(databaseMW)
  .get(fetch_user_by_id_2)
  .put(VerifyTokenMW, ProcessFormDataMW, UpdateUserMW, LoginMW);

export default handler;
