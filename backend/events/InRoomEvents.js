const User = require("../data/User");

function addToQueue(io, socket, roomManager) {
    socket.on("addToQueue", (url, roomCode) => {
        const room = roomManager.getRoomByCode(roomCode);
        room.addToQueue(url);

    });
}

function removeFromQueue(io, socket, roomManager) {
    socket.on("removeFromQueue", (url, roomCode) => {
        const room = roomManager.getRoomByCode(roomCode);
        room.removeFromQueue(url);
    });
}

function playFirstVideoFromQueue(io, socket, roomManager) {
    socket.on("playFirst", (userName, roomName, callback) => { });
}

module.exports = function (io, socket, roomManager) {
    addToQueue(io, socket, roomManager);
    removeFromQueue(io, socket, roomManagger);
 };
