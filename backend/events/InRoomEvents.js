const User = require("../data/User");
const Video = require("../data/Video");
const { YouTube } = require("popyt");
const youtube = new YouTube("AIzaSyCsof__3zgqWFUYwm3s0ED3jWHP8gHs06I");

// Continuously plays videos in queue. The next video in the queue will be
// automatically played after the current one finishes.
function playNextInQueue(io, room) {
    const roomCode = room.roomCode;
    io.to(String(roomCode)).emit("playNextInQueue");

    room.playNextInQueue(() => {
        // Continuously play next in queue
        if (room.queue.length > 0) {
            playNextInQueue(io, room);
        } else {
            // Reset
            room.currentlyPlaying = {
                video: null,
                timestamp: null,
            };
        }
    });
}

function addToQueue(io, socket, roomManager) {
    socket.on("addToQueue", async (item, roomCode) => {
        const room = roomManager.getRoomByCode(roomCode);

        const { videoID, title, channel, thumbnail } = item;

        // TODO: Move this along with frontend Youtube API call to a backend endpoint
        const youtubeVideo = await youtube.getVideo(videoID);
        const duration = (youtubeVideo.minutes * 60 + youtubeVideo.seconds) * 1000;
        const video = new Video(videoID, title, channel, thumbnail, duration);

        room.queue = [...room.queue, video];
        io.to(String(roomCode)).emit("addToQueue", item);

        // Start playing new video if queue was empty and a video is not playing currently
        if (room.queue.length === 1 && room.currentlyPlaying.video == null) {
            playNextInQueue(io, room);
        }
    });
}

function removeFromQueue(io, socket, roomManager) {
    socket.on("removeFromQueue", (item, roomCode) => {
        const room = roomManager.getRoomByCode(roomCode);
        room.removeFromQueue(item.id);

        io.to(String(roomCode)).emit("removeFromQueue", item);
    });
}

function pauseVideo(io, socket, roomManager) {
    socket.on("pauseVideo", (roomCode) => {
        roomManager.getRoomByCode(roomCode).currentlyPlaying.timestamp.pause();

        // How do we want to handle out of sync timestamps when the host pauses?
        io.to(String(roomCode)).emit("pauseVideo");
    });
}

function resumeVideo(io, socket, roomManager) {
    socket.on("resumeVideo", (roomCode) => {
        roomManager.getRoomByCode(roomCode).currentlyPlaying.timestamp.resume();

        io.to(String(roomCode)).emit("resumeVideo");
    });
}

function skipToTimestamp(io, socket, roomManager) {
    socket.on("skipToTimestamp", (roomCode, timestamp) => {
        //
    });
}

module.exports = function (io, socket, roomManager) {
    addToQueue(io, socket, roomManager);
    removeFromQueue(io, socket, roomManager);
    pauseVideo(io, socket, roomManager);
    resumeVideo(io, socket, roomManager);
    skipToTimestamp(io, socket, roomManager);
};
