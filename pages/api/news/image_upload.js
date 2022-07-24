import { create_post } from "../../../controllers/news_controller";
var _ = require("lodash");

let upload = require("../../../config/multer.config.js");
const awsWorker = require("../../../controllers/aws.controller.js");

const multer = require("multer");

export default async function handler(req, res) {
  const { method } = req;
  console.log(`------------`);

  switch (method) {
    case "GET":
      try {
        return res
          .status(442)
          .json({ success: false, message: "endpoint not found" });
      } catch (dev_error) {
        console.log(`dev_error`, dev_error);
        return res
          .status(442)
          .json({ success: false, message: "no news found in db" });
      }
      break;
    case "POST":
      try {
        upload.single("image")(req, {}, (err) => {
          // do error handling here
          if (err) {
            console.log(`err`, err);
            throw new Error("multer failed to parse the file");
          }
          awsWorker.doUpload(req, res);
        });
      } catch (error) {
        res.status(500).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
