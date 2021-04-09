const User = require("../data/User");

function handleCreateRoom(io, socket, roomManager) {
    // Note, passing in just a single string atm, can be refactored to object/JSON, like a DTO object
    socket.on('createRoom', (userName) => {
        const user = new User(userName);
        roomManager.createRoom(user);
    });
}

function handleJoinRoom(io, socket, roomManager) {
    socket.on('joinRoom', (userName, roomID) => {
        const user = new User(userName);
        roomManager.addUserToRoom(user, roomID);
    });
}

module.exports = function (io, socket, roomManager){
    handleCreateRoom(io, socket, roomManager);
    handleJoinRoom(io, socket, roomManager);
}