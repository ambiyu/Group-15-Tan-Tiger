import YouTube from '@u-wave/react-youtube';

function YoutubePlayer({videoURL, timestamp}) {
    timestamp = isNaN(timestamp) ? 0 : timestamp;
    return (
        <div className="YoutubePlayer">
        <YouTube video={videoURL} autoplay startSeconds={timestamp}/>
        </div>
    );
}

export default YoutubePlayer;