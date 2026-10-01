// {
//   "Version": "2012-10-17",
//   "Statement": [
//     {
//       "Effect": "Allow",
//       "Principal": {
//         "AWS": "arn:aws:iam::211125564393:user/sampleuse "
//       },
//       "Action": "s3:*",
//       "Resource": [
//         "arn:aws:s3:::testbucketcodewithaquib",
//         "arn:aws:s3:::testbucketcodewithaquib/*"
//       ]
//     }
//   ]
// }

const AWS = require("aws-sdk");

AWS.config.update({ region: "ap-south-1" });

const s3 = new AWS.S3();
const S3_BUCKET = "insert_bucket_name";

module.exports = { s3, S3_BUCKET };
