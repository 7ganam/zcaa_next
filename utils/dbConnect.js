if (typeof window === "undefined") {
  // make sure this runs only on server side

  var _ = require("lodash");
  const mongoose = require("mongoose");

  function getRequiredMongoUri() {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }

    return mongoUri;
  }

  /**
   * Global is used here to maintain a cached connection across hot reloads
   * in development. This prevents connections growing exponentially
   * during API Route usage.
   */
  let cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  async function dbConnect() {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const mongoUri = getRequiredMongoUri();
      const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
        bufferMaxEntries: 0,
        useFindAndModify: false,
        useCreateIndex: true,
      };

      cached.promise = mongoose.connect(mongoUri, opts).then((mongoose) => {
        return mongoose;
      });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  }

  module.exports = { dbConnect };
}
