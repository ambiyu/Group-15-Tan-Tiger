const User = require("../data/User");

function handleCreateRoom(io, socket, roomManager) {
    // Note, passing in just a single string atm, can be refactored to object/JSON, like a DTO object
    socket.on('createRoom', (userName, callback) => {
        const user = new User(userName);
        const roomCode = roomManager.createNewRoom(user);
        // For testing
        console.log("Created new room with user in it")
        console.log(roomManager.roomDict);

        // Join this client socket to the a specific room. This prevent broadcasting to everyone.
        socket.join(String(roomCode));

        callback({
            roomCode
        })

        //io.to(String(roomCode)).emit('enterRoom', roomCode);
    });
}

function handleJoinRoom(io, socket, roomManager) {
    socket.on('joinRoom', (roomCodeAndUserName) => {
        const roomCode = roomCodeAndUserName.roomCode;
        console.log(roomCode)
        const userName = roomCodeAndUserName.userName;
        const user = new User(userName);
        console.log('Attempting to join room')
        roomManager.addUserToRoom(user, roomCode);
        console.log(roomManager.roomDict);
        console.log(roomCode)

        socket.join(String(roomCode));

        console.log("try to send msg")
        const broadcast = "HELLO EVERYONE"
        const msg = "Here's something for only 1 room"
        io.emit("testAll", broadcast)
        io.to(String(roomCode)).emit('someInRoomEvent', msg);
    });
}

module.exports = function (io, socket, roomManager){
    handleCreateRoom(io, socket, roomManager);
    handleJoinRoom(io, socket, roomManager);
}