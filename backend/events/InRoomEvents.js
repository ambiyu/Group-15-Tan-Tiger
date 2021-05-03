const User = require("../data/User");

function addToQueue(io, socket, roomManager) {
    socket.on("addToQueue", (item, roomCode) => {
        const room = roomManager.getRoomByCode(roomCode);
        room.addToQueue(item.id);

        io.to(String(roomCode)).emit("updateQueue", item);
    });
}

function removeFromQueue(io, socket, roomManager) {
    socket.on("removeFromQueue", (item, roomCode) => {
        const room = roomManager.getRoomByCode(roomCode);
        room.removeFromQueue(item.id);

        io.to(String(roomCode)).emit("remove", item);
    });
}

function playFirstVideoFromQueue(io, socket, roomManager) {
    socket.on("playFirst", (roomCode) => {
        //starts playing for all. just using a message paasing for now
        io.to(String(roomCode)).emit("play", "Start to play");
    });
}

module.exports = function (io, socket, roomManager) {
    addToQueue(io, socket, roomManager);
    removeFromQueue(io, socket, roomManager);
    playFirstVideoFromQueue(io, socket, roomManager);
};
