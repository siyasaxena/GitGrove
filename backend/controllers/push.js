const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config.js");
async function pushRepo() {
  const repoPath = path.resolve(process.cwd(), ".GitGrove");
  const commitPath = path.join(repoPath, "commits");
  try {
    const commitDirs = await fs.readdir(commitPath);
    for (const commitDir of commitDirs) {
      const commitPath = path.join(commitPath, commitDir);
      const files = await fs.readdir(commitPath);

      for (const file of files) {
        const filePath = path.join(commitPath, file);
        const fileContent = await fs.readFile(filePath);
        const params = {
          Bucket: S3_BUCKET,
          Key: `commits/${commitDir}/${file}`,
          Body: fileContent,
        };

        await s3.upload(params).promise();
      }
    }

    console.log("All commits pushed to s3.", err);
  } catch (e) {
    console.log("Error pushing to s3: ", err);
  }
}

module.exports = { pushRepo };
