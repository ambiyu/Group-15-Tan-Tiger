const {Youtube} = require('popyt');
const youtube = new YouTube(process.env.YOUTUBE_API_KEY, { cache: false })

class YoutubeQueue {
    constructor() {
        this.queue = []; // Array of video URLs. Most recently added is at the end of the array. The first element is the currently playing video.
        this.history = []; // Previously played videos. Most recently played is at the end of the array.
    }

    addToQueue(videoURL) {
        this.queue.push(videoURL);
    }

    removeFromQueue(videoURL) {
        index = this.queue.find((e) => e === videoURL);
        if(index !== undefined && index > 0) { // Do not want to delete currently playing video.
            this.queue.splice(index,1);
        }
    }
    // Jumps back or forth in the queue.
    // Positive values bring a video in the queue to the front and start playing it. The currently playing video is pushed into history.
    // Negative values bring a video from history back into the queue. The history is unchanged apart from the currently playing video being pushed into it.
    // 0 does nothing.
    // Returns the video to be played. Undefined means no changes should be made.
    jumpQueue(index) { 
        if(index === 0) {
            return undefined;
        } else if (index === 1) {
            return this.advanceQueue();
        }
        usingHistory = index < 0;
        this.history.push(this.queue[0]);
        if(usingHistory) {
            index = -index-1;
            if(this.history.length >= index) {
                return undefined;
            }
            this.queue[0] = this.history[index];
        } else {
            // Jumping to video in queue
            if(this.queue.length >= index) {
                return undefined;
            }
            newSong = this.queue.splice(index,1)[0];
            this.queue.unshift(newSong);
        }
        return this.queue[0];
    }

    advanceQueue() { // Advances the queue and returns the URL of the video to be played.
        oldVideo = this.queue.shift();
        if(oldVideo === undefined) {  // Returns undefined if the queue is empty.
            return undefined;
        }
        this.history.push(oldVideo);
        if(this.queue.length === 0) { // Returns undefined if the queue is now empty.
            return undefined;
        }
        return this.queue[0];
    }

    getCurrentVideoObject() { // Returns the current video's info collected by the Youtube API.
        if(this.queue.length === 0) {
            return undefined;
        }
        return await youtube.getVideo(this.queue[0]);
    }

    getVideoObjectByIndex(index) { // Gets video information of a specific entry in the queue. Negative values check history.
        list = index >= 0 ? this.queue : this.history;
        index = index >= 0 ? index : -index - 1; // Negative values need to be made positive and zero-based to properly interact with history array.
        if(list.length >= index) {
            return undefined;
        }
        return await youtube.getVideo(list[index]);
    }

    getVideoObjectByURL(videoURL) { // Gets video information of a specific URL.
        return await youtube.getVideo(videoURL);
    }
}

module.exports = YoutubeQueue;