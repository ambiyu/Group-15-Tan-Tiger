// Manages all rooms - a user can either join an existing room if they have the
// corresponding room code, or can make a new one.
const Room = require("../data/Room");

class RoomManager {
    constructor() {
        // Key as roomID, and value as the Room object.
        this.roomDict = {};
    }

    createNewRoom(user, roomName) {
        const roomCode = this.generateRandID();
        // TODO: Ensure no duplicate ID before creating room.
        const room = new Room(roomCode, roomName);
        this.roomDict[roomCode] = room;
        room.addUser(user);
        return roomCode;
    }

    addUserToRoom(user, roomCode) {
        const room = this.roomDict[String(roomCode)];
        if (room) {
            room.addUser(user);
        } else {
            console.log("Error: No room with that code");
        }
    }

    getRoomByCode(roomCode) {
        const room = this.roomDict[String(roomCode)];
        if (room) {
            return room;
        } else {
            console.log("Error: No room with that code");
            return null;
        }
    }

    generateRandID() {
        // Make a random 6 digit number
        return 100000 + Math.floor(Math.random() * 900000);
    }

    // For testing purposes, reset entire RoomManager.
    clearAllData() {
        this.roomDict = {};
    }

}

module.exports = RoomManager;
