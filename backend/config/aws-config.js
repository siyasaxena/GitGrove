{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::211125564393:user/sampleuse "
      },
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::testbucketcodewithaquib",
        "arn:aws:s3:::testbucketcodewithaquib/*"
      ]
    }
  ]
}