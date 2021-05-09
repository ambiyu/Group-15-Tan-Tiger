function handleReceivingMessage(io, socket, roomManager) {
    socket.on("sendingMessage", (message, roomCode) => {
        io.to(String(roomCode)).emit("newMessage", message);
    });
}

module.exports = function (io, socket, roomManager) {
    handleReceivingMessage(io, socket, roomManager);
};
