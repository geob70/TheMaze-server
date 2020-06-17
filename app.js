const Express = require("express")();
const Http = require("http").Server(Express);
const SocketIo = require("socket.io")(Http);
const Cors = require("cors");
const BodyParser = require("body-parser");

Express.use(BodyParser.json());
Express.use(BodyParser.urlencoded({ extended: true }));
Express.use(Cors());

const { generator } = require("./mazeGenerator");

let total = 0;

let position1 = {
  x: 126,
  y: 126,
};

let position0 = {
  x: 6,
  y: 6,
};

let direction = "";

SocketIo.on("connection", (socket) => {
  socket.on("hey", () => {
    total += 1;
    if (total === 2) {
      const grid = generator();
      SocketIo.emit("maze", grid);
    } else {
      SocketIo.emit("maze", false);
    }
    console.log(total);
  });
  // socket.on("get", (data) => {
  //   console.log(data);
  // });
  socket.emit("runner", position1);
  socket.emit("chaser", position0);
  socket.emit("direction", direction);
  socket.on("move", (player, movement) => {
    if (player === "runner") {
      switch (movement) {
        case "ArrowLeft":
          position1.x -= 24;
          SocketIo.emit(player, position1);
          socket.emit("direction", movement);
          break;
        case "ArrowRight":
          position1.x += 24;
          SocketIo.emit(player, position1);
          socket.emit("direction", movement);
          break;
        case "ArrowUp":
          position1.y -= 24;
          SocketIo.emit(player, position1);
          socket.emit("direction", movement);
          break;
        case "ArrowDown":
          position1.y += 24;
          SocketIo.emit(player, position1);
          socket.emit("direction", movement);
          break;
      }
    } else {
      switch (movement) {
        case "ArrowLeft":
          position0.x -= 24;
          SocketIo.emit(player, position0);
          socket.emit("direction", movement);
          break;
        case "ArrowRight":
          position0.x += 24;
          SocketIo.emit(player, position0);
          socket.emit("direction", movement);
          break;
        case "ArrowUp":
          position0.y -= 24;
          SocketIo.emit(player, position0);
          socket.emit("direction", movement);
          break;
        case "ArrowDown":
          position0.y += 24;
          SocketIo.emit(player, position0);
          socket.emit("direction", movement);
          break;
      }
    }
  });
  socket.on("nullify", (player, data) => {
    if (player === "runner") {
      position1 = data;
      SocketIo.emit(player, position1);
    } else {
      position0 = data;
      SocketIo.emit(player, position0);
    }
  });
});

Http.listen(3000, () => {
  console.log("Server running on port 3000..");
});
