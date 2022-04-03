import nextConnect from 'next-connect';
import type {NextApiResponse, NextApiRequestExtended} from './Type';
import {initializeRequest} from './Type';

export default function getBaseHandler() {
  return nextConnect<NextApiRequestExtended, NextApiResponse>({
    onError(error, req, res) {
      res
        .status(501)
        .json({error: `Sorry something Happened! ${error.message}`});
    },
    onNoMatch(req, res) {
      res.status(405).json({error: `Method ${req.method} Not Allowed`});
    },
  }).use((req, res, next) => {
    initializeRequest(req);
    req.userIdTest = 'test1';
    req.usernameTest = 'test2';

    const {authorization} = req.headers;

    if (!authorization) {
      req.authorized = false;
      next();
    } else {
      req.authorized = true;
      next();
    }
  });
}
