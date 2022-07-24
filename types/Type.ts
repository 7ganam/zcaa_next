import {NextApiRequest, NextApiResponse} from 'next';

interface NextApiRequestExtended extends NextApiRequest {
  userIdTest: string | null;
  usernameTest: string | null;
  authorized: boolean | null;
  db: any;
  user: any; //TODO: find how to extract type from mongoose model
  logInMessage: string | null;
  verified_user: any;
}

const initializeRequest = (req: NextApiRequestExtended): void => {
  req.userIdTest = null;
  req.usernameTest = null;
  req.authorized = null;
  req.db = null;
  req.user = null;
  req.logInMessage = null;
  req.verified_user = null;
  return;
};

export type {NextApiResponse, NextApiRequestExtended};
export {initializeRequest};
