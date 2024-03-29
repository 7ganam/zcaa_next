if (typeof window === "undefined") {
  // make sure this runs only on server side

  const mongoose = require("mongoose");
  const Schema = mongoose.Schema;

  const meta_values_schema = new Schema({
    Title: {
      type: String,
      required: true,
      // unique: true
    },
    thumbnail_text: {
      type: String,
      required: true,
      // unique: true
    },
    Date: {
      type: String,
      required: true,
      // unique: true
    },
  });

  const news_post_schema = new Schema({
    EditorData: Schema.Types.Mixed,
    meta_values: {
      type: [meta_values_schema],
      required: true,
      // unique: true
    },
  });

  // export default mongoose.models.NewsPost || mongoose.model('NewsPost', news_post_schema)
  module.exports = {
    NewsPosts:
      mongoose.models.NewsPost || mongoose.model("NewsPost", news_post_schema),
  };
}
