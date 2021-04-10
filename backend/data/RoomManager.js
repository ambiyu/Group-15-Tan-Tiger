// Manages all rooms - a user can either join an existing room if they have the 
// corresponding room code, or can make a new one. 
const Room = require('../data/Room');

class RoomManager {
    constructor() {
        // Key as roomID, and value as the Room object.
        this.roomDict = {}
    }

    createNewRoom(user){
        const roomID = this.generateRandID();
        // TODO: Ensure no duplicate ID before creating room.
        const room = new Room(roomID);
        this.roomDict[roomID] = room;
        room.addUser(user);
        return roomID;
    }

    addUserToRoom(user, roomID) {
        const room = this.roomDict[String(roomID)];
        if (room) {
            room.addUser(user);
        } else {
            console.log("Error: No room with that ID");
        }
        // TODO: Error handling - returning that its invalid roomID given by client
    }

    generateRandID() {
        // Make a random 6 digit number
        return 100000 + Math.floor(Math.random() * 900000);
    }
}

module.exports = RoomManager;