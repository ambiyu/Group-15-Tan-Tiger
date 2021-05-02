const User = require("../data/User");

function addToQueue(io, socket, roomManager) {
    socket.on("addToQueue", (url, roomCode) => {
        const room = roomManager.getRoomByCode(roomCode);
        room.addToQueue(url);

        io.to(String(roomCode)).emit('updateQueue', url)

    });
}

function removeFromQueue(io, socket, roomManager) {
    socket.on("removeFromQueue", (url, roomCode) => {
        const room = roomManager.getRoomByCode(roomCode);
        room.removeFromQueue(url);

        io.to(String(roomCode)).emit('remove', url)
    });
}

function playFirstVideoFromQueue(io, socket, roomManager) {
    socket.on("playFirst", (userName, roomName, callback) => {
        //starts playing for all. just using a message paasing for now
        io.to(String(roomCode)).emit('play', "Start to play");
    });
}

module.exports = function (io, socket, roomManager) {
    addToQueue(io, socket, roomManager);
    removeFromQueue(io, socket, roomManager);
    playFirstVideoFromQueue(io, socket, roomManager);
};
