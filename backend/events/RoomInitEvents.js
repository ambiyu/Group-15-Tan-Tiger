const User = require("../data/User");

function handleCreateRoom(io, socket, roomManager) {
    // Note, passing in just a single string atm, can be refactored to object/JSON, like a DTO object
    // This is using Acknowledgements - adding a callback to last argument of the emit() call, and this 
    // callback will be called once the other side acknowledges the event ie receives the createRoom event
    // and sends back room code.
    socket.on('createRoom', (userName, roomName, callback) => {
        const user = new User(userName);
        const roomCode = roomManager.createNewRoom(user, roomName);

        // Join this client socket to the a specific room. This prevent broadcasting to everyone.
        // Rooms are associated with a string, so must cast to work as expected.
        socket.join(String(roomCode));

        callback({
            roomCode
        })

        // Either a callback or an emitter event can be used to return the room code
        // io.to(String(roomCode)).emit('enterRoom', roomCode);
    });
}

function handleJoinRoom(io, socket, roomManager) {
    socket.on('joinRoom', (roomCode, userName) => {
        // Extract values from transfered data and create new User to be added 
        // TODO: Validate user name so naming conflicts dont occur, or can be handled gracefully
        const user = new User(userName);
    
        roomManager.addUserToRoom(user, roomCode);
        
        // Join this client socket to the a specific room. This prevent broadcasting to everyone.
        socket.join(String(roomCode));

        // Send message to all in room that new user has joined - more data might be required, but
        // user name should be sufficient for now.
        io.to(String(roomCode)).emit('newUserInRoom', userName);
    });
}

module.exports = function (io, socket, roomManager){
    handleCreateRoom(io, socket, roomManager);
    handleJoinRoom(io, socket, roomManager);
}