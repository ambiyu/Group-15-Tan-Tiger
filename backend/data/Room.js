// Data structure for storing state of a 'room' - this is where users connect to and can
// share links to music/videos, and chat to one another.

const Timer = require("tiny-timer");
const YoutubeQueue = require("./YoutubeQueue");

class Room {
    constructor(roomCode, roomName) {
        this.roomName = roomName;
        this.roomCode = roomCode;
        this.users = [];
        this.currentlyPlaying = {
            video: null,
            timestamp: null,
        };
        this.chatMessages = []; // Chat won't be used in initial prototypes, but will store for later.
        this.musicQueue = new YoutubeQueue(); // Could initially store just URL, but could refactor to include votes too etc.
        this.queue = [];
        this.admin = ""; // Can specify which user is admin, might have admin specific privileges
        this.paused = true; // Rooms start with no video so default to true.
    }

    playNextInQueue(doneCallback) {
        if (this.queue.length > 0) {
            this.currentlyPlaying.video = this.queue.shift();
            this.currentlyPlaying.timestamp = new Timer({ stopwatch: true });
            this.currentlyPlaying.timestamp.on("done", doneCallback);

            const DELAY_BETWEEN_VIDEOS = 3000;
            this.currentlyPlaying.timestamp.start(
                this.currentlyPlaying.video.duration + DELAY_BETWEEN_VIDEOS
            );
        }
    }

    addUser(user) {
        this.users.push(user);
    }

    addToQueue(url) {
        this.musicQueue.addToQueue(url);
    }

    removeFromQueue(url) {
        this.musicQueue.removeFromQueue(url);
    }
}

module.exports = Room;
