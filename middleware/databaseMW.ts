//explanations:
//mongoose requires a single call to the mongoose.connect() in all of the application ..
//any other module can use mongoose after that by just importing it
//In next.js the connection might be cached in the global object across calls.. here we make sure it's not cached then call the connection function
//I made it into a middleware .. there is no strong reason for that as we don't need to attach anything to the req. (I attach the connection anyway for no reason)
//It can be jus a function call the baseHandler but this way I will have to make a connection to every request even those that doesn't use the database

import mongoose from 'mongoose';
import type {NextApiResponse, NextApiRequestExtended} from './Type';

const globalAny: any = global;

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cachedMongoose connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cachedMongoose: any = globalAny.mongoose;

if (!cachedMongoose) {
  cachedMongoose = globalAny.mongoose = {conn: null, promise: null};
}

async function databaseMW(
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) {
  if (cachedMongoose.conn) {
    req.db = cachedMongoose.conn;
    return next();
  }

  if (!cachedMongoose.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
    };

    cachedMongoose.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose: any) => {
        return mongoose;
      });
  }
  cachedMongoose.conn = await cachedMongoose.promise;
  req.db = cachedMongoose.conn;
  return next();
}

export default databaseMW;
