import YouTube from '@u-wave/react-youtube';
import { useContext, useEffect, useRef } from 'react';
import { RoomContext } from '../context/RoomContextProvider';
import socket from '../Socket';

function YoutubePlayer() {
    const { state, dispatch } = useContext(RoomContext);
    console.log(state);

  useEffect(() => {
    let actualVideo = state.currentlyPlaying.videoURL;
    dispatch({type: 'changeSongPlaying', videoURL: '0'});
    setTimeout(() => dispatch({type: 'changeSongPlaying', videoURL: actualVideo}), 20); // Delay needed to force update the player.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentlyPlaying.timestamp]);

  function pauseVideo(pauseTime) {
    console.log('upstream pause for room ' + state.roomCode);
    socket.emit('pauseVideo', pauseTime, state.roomCode);
  }
  function resumeVideo(resumeTime) {
    console.log('upstream resume for room ' + state.roomCode);
    socket.emit('resumeVideo', resumeTime, state.roomCode);
  }

  return (
    <div className="YoutubePlayer">
      <YouTube
        video={state.currentlyPlaying.videoID}
        startSeconds={state.currentlyPlaying.timestamp}
        autoplay
        disableKeyboard={true}
        paused={state.paused}
        onPause={(e) => pauseVideo(e.target.getCurrentTime())}
        onPlaying={(e) => resumeVideo(e.target.getCurrentTime())}
      />
    </div>
  );
}

export default YoutubePlayer;