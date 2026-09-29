const fs = require("fs").promises;
const path = require("path");
async function initRepo() {
  const repoPath = path.resolve(process.cwd(), ".GitGrove");
  const commitsPath = path.join(repoPath, "commits");
  try {
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitsPath, { recursive: true });
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify(
        {
          storageProvider: process.env.STORAGE_PROVIDER || "local",
          initializedAt: new Date().toISOString(),
        },
        null,
        2,
      ),
    );
    console.log("Repository initialized!!");
  } catch (e) {
    console.log("Error initializing repository", err);
  }
}

module.exports = { initRepo };
