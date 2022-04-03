import getBaseHandler from '../../../middleware/BaseHandler';
import databaseMW from '../../../middleware/databaseMW';
import googleAuthMW from '../../../middleware/googleAuthMW';
import LoginMW from '../../../middleware/LoginMW';

const handler = getBaseHandler().use(databaseMW).post(googleAuthMW, LoginMW);

export default handler;
