import { getUser } from "../../../controllers/user_controller";
import getBaseHandler from "../../../middleware/BaseHandler";
import ProcessFormDataMW from "../../../middleware/ProcessFormDataMW";
import databaseMW from "../../../middleware/databaseMW";
import { VerifyTokenMW2 } from "../../../middleware/VerifyTokenMW";
import UpdateUserMW from "../../../middleware/UpdateUserMW";
import LoginMW from "../../../middleware/LoginMW";

const handler = getBaseHandler()
  .use(databaseMW)
  .get(getUser)
  .put(VerifyTokenMW2, ProcessFormDataMW, UpdateUserMW, LoginMW);

export default handler;
