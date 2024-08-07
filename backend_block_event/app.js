const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
  },
});

// REST api request
app.get("/", (req, res) => {
  res.send(`
  <body style="background-color: #000;">
  <h1 style="color: #fff">Hello World</h1>
  </body>`);
});

const queue = [];
// const connectedUsers = [];
// Socket connections
io.on("connection", (socket) => {
  socket.on("askForBlocking", (userData) => {
    const newUser = JSON.parse(userData);
    queue.push({
      ...newUser,
      socketId: socket.id,
    });
    console.log(newUser.name, "connected");

    if (queue[0]) {
      const firstUser = queue[0];
      console.log("First user: ", firstUser);
      socket.emit(
        "eventBlocked",
        JSON.stringify({
          id: firstUser.id,
          name: firstUser.name,
        })
      );
    }
  });

  socket.on("disconnect", () => {
    const index = queue.findIndex((user) => user.socketId === socket.id);
    if (index > -1) {
      const user = queue[index];
      const { name } = user;

      queue.splice(index, 1);
      console.log(name, "disconnected");

      if (queue.length < 1) {
        return;
      }

      if (index === 0) {
        const firstUser = queue[0];
        socket.broadcast.emit(
          "eventBlocked",
          JSON.stringify({
            id: firstUser.id,
            name: firstUser.name,
          })
        );
      }
    }
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
