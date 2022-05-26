const jwt = require("jsonwebtoken");
import type { NextApiResponse, NextApiRequestExtended } from "../types/Type";

async function VerifyTokenMW(
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.verified_user = decoded.user;
    req.user = decoded.user;
    next();
    // return res.status(200).json({ user: decoded.user });
  } catch (err) {
    return res.status(401).json({ success: false });
  }
}

async function VerifyTokenMW2(
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) {
  let token = req.headers.authorization.substring(
    7,
    req.headers.authorization.length
  );
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.verified_user = decoded.user;
    req.user = decoded.user;

    next();
    // return res.status(200).json({ user: decoded.user });
  } catch (err) {
    return res.status(401).json({ success: false });
  }
}

export { VerifyTokenMW, VerifyTokenMW2 };
