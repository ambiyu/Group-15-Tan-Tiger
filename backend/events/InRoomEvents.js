const User = require("../data/User");
const Video = require("../data/Video");
const { YouTube } = require("popyt");
const Timer = require("tiny-timer");
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
    socket.on("addToQueue", (item, roomCode) => {
        const room = roomManager.getRoomByCode(roomCode);
        room.addToQueue(item.id);

        io.to(String(roomCode)).emit('updateQueue', item)

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
    socket.on("pauseVideo", (pauseTime, roomCode, user) => {
        const room = roomManager.getRoomByCode(roomCode);
        if(room === null || room.paused === undefined || room.paused === true || room.admin !== user) {
            return;
        }
        room.paused = true;
        roomManager.getRoomByCode(roomCode).currentlyPlaying.timestamp.pause();

        // How do we want to handle out of sync timestamps when the host pauses?
        console.log('downstream pause');
        io.to(String(roomCode)).emit("pauseVideo", pauseTime, user);
    });
}

function resumeVideo(io, socket, roomManager) {
    socket.on("resumeVideo", (resumeTime, roomCode, user) => {
        const room = roomManager.getRoomByCode(roomCode);
        if(room === null || room.paused === undefined || room.paused === false || room.admin !== user) {
            return;
        }
        room.paused = false;
        room.currentlyPlaying.timestamp = new Timer({ stopwatch: true });
        const DELAY_BETWEEN_VIDEOS = 3000;
        room.currentlyPlaying.timestamp.start(room.currentlyPlaying.video.duration -(resumeTime*1000) + DELAY_BETWEEN_VIDEOS);
        console.log('downstream resume');
        io.to(String(roomCode)).emit("resumeVideo", resumeTime, user);
    });
}

function playFirstVideoFromQueue(io, socket, roomManager) {
    socket.on("playFirst", (userName, roomName, callback) => {
        //starts playing for all. just using a message paasing for now
        io.to(String(roomCode)).emit('play', "Start to play");
    });
}

module.exports = function (io, socket, roomManager) {
    addToQueue(io, socket, roomManager);
    removeFromQueue(io, socket, roomManager);
    playFirstVideoFromQueue(io, socket, roomManager);
    pauseVideo(io, socket, roomManager);
    resumeVideo(io, socket, roomManager);
};
