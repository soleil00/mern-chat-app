const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//importing all routes
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config();
const app = express();

//connecting to d
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `successfuly connected to db and server running on port ${process.env.PORT}`
      );
    });
  })
  .catch(() => {
    console.log("can't connect to db");
  });

app.use(cors());
const server = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`new user connected ${socket.id}`);

//   socket.on("message", (data) => {
//     console.log(`new message: ${data}`);
//     socket.broadcast.to(data.room).emit("receive_message", data.message);
//   });

//   socket.on("join_room", (data) => {
//     socket.join(data);
//   });
// });

app.get("/", (re, res) => {
  res.send("hello");
});

// all routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
