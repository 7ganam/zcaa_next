import getBaseHandler from '../../../middleware/BaseHandler';
import databaseMW from '../../../middleware/databaseMW';
import {googleAuthMW2} from '../../../middleware/googleAuthMW';
import Login from '../../../controllers/auth.controller';

const handler = getBaseHandler().use(databaseMW).post(googleAuthMW2, Login);

export default handler;
