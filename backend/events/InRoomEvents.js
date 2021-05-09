const Video = require("../data/Video");
const { YouTube } = require("popyt");
const youtube = new YouTube("AIzaSyCsof__3zgqWFUYwm3s0ED3jWHP8gHs06I");

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
        if (room.queue.length === 1 && !room.currentlyPlaying.video) {
            playNextInQueue(room, io);
        }
    });
}

// Not currently used
function removeFromQueue(io, socket, roomManager) {
    socket.on("removeFromQueue", (item, roomCode) => {
        const room = roomManager.getRoomByCode(roomCode);
        room.removeFromQueue(item.id);

        io.to(String(roomCode)).emit("removeFromQueue", item);
    });
}

function pauseVideo(io, socket, roomManager) {
    socket.on("pauseVideo", (pauseTime, roomCode, user) => {
        const room = roomManager.getRoomByCode(roomCode);
        if (room === null || room.paused === true || room.admin !== user) {
            return;
        }

        room.pauseVideo();

        // How do we want to handle out of sync timestamps when the host pauses?
        io.to(String(roomCode)).emit("pauseVideo", pauseTime, user);
    });
}

function playVideo(io, socket, roomManager) {
    socket.on("playVideo", (playTime, roomCode, user) => {
        const room = roomManager.getRoomByCode(roomCode);
        if (room === null || room.paused === false || room.admin !== user) {
            return;
        }

        // Continuously plays videos in queue. The next video in the queue will be
        // automatically played after the current one finishes.
        room.playVideo(playTime, () => {
            playNextInQueue(room, io);
        });

        io.to(String(roomCode)).emit("playVideo", playTime, user);
    });
}

function playNextInQueue(room, io) {
    const nextVideo = room.advanceQueue();

    if (nextVideo) {
        io.to(String(room.roomCode)).emit("playNextInQueue");

        room.playVideo(0, () => {
            playNextInQueue(room, io);
        });
    }
}

module.exports = function (io, socket, roomManager) {
    addToQueue(io, socket, roomManager);
    removeFromQueue(io, socket, roomManager);
    pauseVideo(io, socket, roomManager);
    playVideo(io, socket, roomManager);
};
