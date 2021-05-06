// Data structure for storing state of a 'room' - this is where users connect to and can
// share links to music/videos, and chat to one another.

const YoutubeQueue = require("./YoutubeQueue");

class Room {
    constructor(roomCode, roomName) {
        this.roomName = roomName;
        this.roomCode = roomCode;
        this.users = [];
        this.chatMessages = []; // Chat won't be used in initial prototypes, but will store for later.
        this.musicQueue = new YoutubeQueue(); // Could initially store just URL, but could refactor to include votes too etc.
        this.queue = [];
        this.admin = ""; // Can specify which user is admin, might have admin specific privileges
        this.paused = true; // Rooms start with no video so default to true.
    }

    addUser(user) {
        this.users.push(user);
        if(this.admin === "") { // First user becomes the admin.
            this.admin = user.userName;
        }
    }

    addToQueue(url){
        this.musicQueue.addToQueue(url);
    }

    removeFromQueue(url){
        this.musicQueue.removeFromQueue(url);
    }
}

module.exports = Room;
