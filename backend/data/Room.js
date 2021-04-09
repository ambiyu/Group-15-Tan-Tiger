// Data structure for storing state of a 'room' - this is where users connect to and can 
// share links to music/videos, and chat to one another.

class Room {
    constructor(roomID) {
        this.roomID = roomID;
        this.users = [];
        this.chatMessages = []; // Chat won't be used in initial prototypes, but will store for later.
        this.musicQueue = []; // Could initially store just URL, but could refactor to include votes too etc.

        this.admin = ''; // Can specify which user is admin, might have admin specific privileges 
    }

    addUser(user) {
        this.users.push(user)
    }
}

module.exports = Room;