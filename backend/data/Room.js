// Data structure for storing state of a 'room' - this is where users connect to and can
// share links to music/videos, and chat to one another.

const Timer = require("tiny-timer");

const DELAY_BETWEEN_VIDEOS = 3000;
class Room {
    constructor(roomCode, roomName) {
        this.roomName = roomName;
        this.roomCode = roomCode;
        this.users = [];
        this.currentlyPlaying = {
            video: null,
            timestamp: null,
        };
        this.queue = [];
        this.admin = ""; // Can specify which user is admin, might have admin specific privileges
        this.paused = true; // Rooms start with no video so default to true.
    }

    advanceQueue() {
        this.currentlyPlaying.video = this.queue.shift();
        return this.currentlyPlaying.video;
    }

    playVideo(playTime, doneCallback) {
        this.paused = false;
        this.currentlyPlaying.timestamp = new Timer({ stopwatch: true });

        this.currentlyPlaying.timestamp.on("done", doneCallback);

        this.currentlyPlaying.timestamp.start(
            this.currentlyPlaying.video.duration - playTime * 1000 + DELAY_BETWEEN_VIDEOS
        );
    }

    pauseVideo() {
        this.paused = true;
        this.currentlyPlaying.timestamp.pause();
    }

    addUser(user) {
        this.users.push(user);
        if (this.admin === "") {
            // First user becomes the admin.
            this.admin = user.userName;
        }
    }

    addToQueue(url) {
        this.musicQueue.addToQueue(url);
    }

    removeFromQueue(url) {
        this.musicQueue.removeFromQueue(url);
    }
}

module.exports = Room;
