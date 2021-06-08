var stream = require('stream');

const s3 = require('../config/s3.config.js');

exports.doUpload = (req, res) => {

	const s3Client = s3.s3Client;
	const params = s3.uploadParams;

	params.Key = req.file.originalname;
	params.Body = req.file.buffer;

	console.log(`params`, params)

	s3Client.upload(params, (err, data) => {
		if (err) {
			res.status(500).json(
				{
					"success": 0,
					"file": {
						"url": data.Location,
					}
				});
		}

		console.log(data)

		res.json(
			{
				"success": 1,
				"file": {
					"url": data.Location,
				}
			});
	});
}

