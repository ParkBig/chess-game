const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors());
const httpServer = http.createServer(app);
const wsServer = require("socket.io")(httpServer);

// https서버
httpServer.listen(5000, () => console.log("Listening on port 5000"));


const countRoomParticipant = (roomName) => {
  const count = wsServer.sockets.adapter.rooms.get(roomName)?.size;
  if (count === 1) {
    return {count, player: "player-1"};
  }
  if (count === 2) {
    return {count, player: "player-2"};
  }
  return {count, player: "null"};;
}

// 웹소켓
wsServer.on("connection", (socket) => {
  socket.onAny((ev) => { console.log(ev) });

  socket.on("enterRoom", (roomName, goToRoom) => {
    socket.join(roomName);
    goToRoom();
  });

  socket.on("send_msg", (get) => {
    socket.to(get.roomName).emit("get_msg", get.sendChat);
  });

  socket.on("boardSetting", (roomName, setBoard) => {
    const { count, player } = countRoomParticipant(roomName);
    socket["nickName"] = player;
    setBoard(player);
  });

  socket.on("request-move", (get, chessMove) => {
    chessMove(get.targetIndex);
    socket.to(get.roomName).emit("perform-chessMove", get.targetIndex);
  });

  socket.on("block-pick", (get, setIsBlockPick) => {
    setIsBlockPick(get.pickedIndex);
    socket.to(get.roomName).emit("picked-index", get.pickedIndex);
  });
});
