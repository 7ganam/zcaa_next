import getBaseHandler from '../../../middleware/BaseHandler';
import databaseMW from '../../../middleware/databaseMW';
import googleAuthMW from '../../../middleware/googleAuthMW';
import Login from '../../../controllers/auth.controller';

const handler = getBaseHandler().use(databaseMW).post(googleAuthMW, Login);

export default handler;
