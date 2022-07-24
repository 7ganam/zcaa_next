import {getUsers} from '../../../controllers/user_controller';
import getBaseHandler from '../../../middleware/BaseHandler';
import databaseMW from '../../../middleware/databaseMW';

const handler = getBaseHandler().use(databaseMW).get(getUsers);

export default handler;
