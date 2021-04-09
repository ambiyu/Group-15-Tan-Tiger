const User = require("../data/User");

function handleCreateRoom(io, socket, roomManager) {
    // Note, passing in just a single string atm, can be refactored to object/JSON, like a DTO object
    socket.on('createRoom', (userName) => {
        const user = new User(userName);
        roomManager.createNewRoom(user);
        console.log("Created new room with user in it")
        console.log(roomManager.roomDict);
    });
}

function handleJoinRoom(io, socket, roomManager) {
    socket.on('joinRoom', (roomIdAndUserName) => {
        const roomID = roomIdAndUserName.roomID;
        const userName = roomIdAndUserName.userName;
        const user = new User(userName);
        console.log('Attempting to join room')
        roomManager.addUserToRoom(user, roomID);
        console.log(roomManager.roomDict);
    });
}

module.exports = function (io, socket, roomManager){
    handleCreateRoom(io, socket, roomManager);
    handleJoinRoom(io, socket, roomManager);
}