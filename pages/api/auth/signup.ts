import getBaseHandler from "../../../middleware/BaseHandler";
import databaseMW from "../../../middleware/databaseMW";
import { googleAuthMW } from "../../../middleware/googleAuthMW";
import Login from "../../../controllers/auth.controller";
import ProcessFormDataMW from "../../../middleware/ProcessFormDataMW";
import RegisterUserMW from "../../../middleware/RegisterUserMW";
import BreakIfUserExistsMW from "../../../middleware/BreakIfUserExistsMW";
const handler = getBaseHandler()
  .use(databaseMW)
  .post(
    googleAuthMW,
    BreakIfUserExistsMW,
    ProcessFormDataMW,
    RegisterUserMW,
    Login
  );

export default handler;
