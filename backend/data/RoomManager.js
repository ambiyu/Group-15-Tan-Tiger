// Manages all rooms - a user can either join an existing room if they have the 
// corresponding room code, or can make a new one. 
const Room = require('./Room');

class RoomManager {
    constructor() {
        // Key as roomID, and value as the Room object.
        this.roomDict = {}
    }

    createNewRoom(user){
        const roomID = this.generateRandID()
        const room = new Room(roomID);
        this.roomDict[roomID] = room;
        room.addUser(user);
    }

    addUserToRoom(user, roomID) {
        const room = this.roomDict[roomID];
        if (room) {
            room.addUser(user);
        }
        // TODO: Error handling - returning that its invalid roomID given by client
    }

    generateRandID() {
        // Make a random 6 digit number
        return 100000 + Math.floor(Math.random() * 900000);
    }
}

module.exports = RoomManager;