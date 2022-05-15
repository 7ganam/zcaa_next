//explanations:
//mongoose requires a single call to the mongoose.connect() in all of the application ..
//any other module can use mongoose after that by just importing it
//In next.js (development mode at least) the connection might be cached in the node.js global object across calls.. here we make sure it's not cached then call the connection function
//I made it into a middleware .. there is no strong reason for that as we don't need to attach anything to the req. (I attach the connection anyway for no reason)
//It can be just a function call the baseHandler but this way I will have to make a connection to every request even those that doesn't use the database

import mongoose from 'mongoose';
import type {NextApiResponse, NextApiRequestExtended} from './Type';

const globalAny: any = global; // node.js global object

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
let cachedMongoose: any = globalAny.mongoose; //   check if the global object has a mongoose object
if (!cachedMongoose) {
  cachedMongoose = globalAny.mongoose = {conn: null, promise: null}; //if the global object doesn't have a mongoose object assign a null object with this structure.
}

async function databaseMW(
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: Function
) {
  if (cachedMongoose.conn) {
    // if the connection is in the global object already just return it
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

    //start a connection and save the returned promise into the global mongoose object
    cachedMongoose.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose: any) => {
        return mongoose;
      });
  }
  // await the promise to resolve then save the resolved value into the global mongoose object as well.
  cachedMongoose.conn = await cachedMongoose.promise;
  req.db = cachedMongoose.conn;
  return next();
}

export default databaseMW;
