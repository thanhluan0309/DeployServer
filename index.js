//Server for Socket
var WebSocketServer = require("websocket").server;
var http = require("http");
var clients = [];
var server = http.createServer(function (request, response) {});
server.listen(8181, () => {
  console.log("server socket is running port 8181");
});
wsServer = new WebSocketServer({ httpServer: server });
wsServer.on("request", function (request) {
  var connection = request.accept(null, request.origin);
  var index = clients.push(connection) - 1;
  connection.on("message", function (message) {
    if (message.type === "utf8") {
      for (let index = 0; index < clients.length; index++) {
        clients[index].sendUTF(message.utf8Data);
      }
    }
  });
  connection.on("close", function (connection) {});
});

//Server for API
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./component/route/userRouter");
const roomRouter = require("./component/route/roomRouter");
const messageRouter = require("./component/route/messageRoute");
const participantsRouter = require("./component/route/ParticipantsRouter");
dotenv.config();
app.use(bodyparser.json({ limit: "50mb" }));
const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo has connect ");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
app.use(express.json());
 connectDB();

app.use("/webchat/user", userRouter);
app.use("/webchat/room", roomRouter);
app.use("/webchat/message", messageRouter);
app.use("/webchat/participants", participantsRouter);

app.listen(8182, () => {
  console.log("server Api is running port 8182");
});
