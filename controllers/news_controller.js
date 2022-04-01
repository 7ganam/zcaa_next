const { dbConnect } = require("../utils/dbConnect");
const { NewsPosts } = require("../models/newsPosts");

var _ = require("lodash");

const fetch_all_news = async () => {
  await dbConnect();
  let news = [];
  news = await NewsPosts.find({});
  return news;
};

const fetch_news_post_by_id = async (id) => {
  await dbConnect();
  let post;
  post = await NewsPosts.findOne({ _id: id });
  console.log({ post });
  return post;
};

const create_post = async (req, res) => {
  await dbConnect();
  let recieved_newsposts;
  try {
    recieved_newsposts = {
      meta_values: req.body.meta_values,
      EditorData: req.body.EditorData,
    };
    console.log(recieved_newsposts);
  } catch (dev_error) {
    let prod_error = new Error("failed to register news posts");
    console.log(`dev_error`, dev_error);
    res.status(500).json({ success: false });
  }

  try {
    let created_newsposts = await NewsPosts.create(recieved_newsposts);
    console.log(" created_newsposts ", created_newsposts);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(created_newsposts._id);
  } catch (dev_error) {
    let prod_error = new Error("failed to register course");
    prod_error.status = "500";
    res.status(500).json({ success: false });
  }
};

const delete_post = async (req, res) => {
  await dbConnect();
  console.log(`req.params`, req);
  try {
    let resp = await NewsPosts.findByIdAndRemove(req.query.postId);
    res.status(200).json(resp);
  } catch (dev_error) {
    let prod_error = new Error("failed to register news posts");
    console.log(`dev_error`, dev_error);
    res.status(500).json({ success: false });
  }
};

module.exports = {
  delete_post,
  create_post,
  fetch_all_news,
  fetch_news_post_by_id,
};
