const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const mainRouter = require("./routes/main.router");

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init.js");
const { addRepo } = require("./controllers/add.js");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");

dotenv.config();

yargs(hideBin(process.argv))
  .command("starts", "Starts a new server", {}, startServer)
  .command("init", "Initialise a new repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    },
  )
  .command(
    "commit <message>",
    "Commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    commitRepo,
  )
  .command("push", "Push commits to S3", {}, pushRepo)
  .command("pull", "Pull commits from S3", {}, pullRepo)
  .command(
    "revert <commitID>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Comit ID to revert to",
        type: "string",
      });
    },
    revertRepo,
  )
  .demandCommand(
    1,
    "---------$$$$--------you need at least one command---------$$$$--------",
  )
  .help().argv;

function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.json());
  app.use(express.join);

  const mongourl = process.env.MONGO_URL;

  mongoose
    .connect(mongourl)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("Unable to connect:", err));

  app.use(cors({ origin: "*" }));

  app.use("/", mainRouter);

  let user = "test";
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    socket.on("joinRoom", (userID) => {
      user = userID;
      console.log("===");
      console.log(user);
      console.log("====");
      socket.join(userID);
    });
  });

  const db = mongoose.connection;

  db.once("open", async () => {
    console.log("CRUD Operations");
    //crud operations
  });

  httpServer.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
  });
}
