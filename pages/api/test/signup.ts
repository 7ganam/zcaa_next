import getBaseHandler from '../../../middleware/BaseHandler';
import databaseMW from '../../../middleware/databaseMW';
import googleAuthMW from '../../../middleware/googleAuthMW';
import LoginMW from '../../../middleware/LoginMW';
import ProcessFormDataMW from '../../../middleware/ProcessFormDataMW';
import RegisterUserMW from '../../../middleware/RegisterUserMW';

const handler = getBaseHandler()
  .use(databaseMW)
  .post(googleAuthMW, ProcessFormDataMW, RegisterUserMW, LoginMW);

export default handler;
