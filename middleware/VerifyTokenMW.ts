const {Users} = require('../models/users');
var _ = require('lodash');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.OAUTH2ClIENT);
const jwt = require('jsonwebtoken');
import type {NextApiResponse, NextApiRequestExtended} from './Type';

async function VerifyUserMW(
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.verified_user = decoded.user;
    req.user = decoded.user;
    next();
    // return res.status(200).json({ user: decoded.user });
  } catch (err) {
    return res.status(401).json({success: false});
  }
}

export default VerifyUserMW;
