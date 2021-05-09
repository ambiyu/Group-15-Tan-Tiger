const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());

const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 4000;

const initEventHandlers = require("./events/RoomInitEvents");
const inRoomHandlers = require("./events/inRoomEvents");
const chatHandlers = require("./events/ChatEvents");

const RoomManager = require("./data/RoomManager");
// Handles storing information about all rooms - only in memory for now.
const roomManager = new RoomManager();

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    initEventHandlers(io, socket, roomManager);
    inRoomHandlers(io, socket, roomManager);
    chatHandlers(io, socket, roomManager);
});

server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Listening on port number: ${port}`);
});
