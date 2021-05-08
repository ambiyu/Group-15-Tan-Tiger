import YouTube from '@u-wave/react-youtube';
import { useContext, useEffect, useRef } from 'react';
import { RoomContext } from '../context/RoomContextProvider';
import socket from '../Socket';

function YoutubePlayer() {
  const { state, dispatch } = useContext(RoomContext);
  let playerComponent = useRef(null);
  // console.log(state);

  // useEffect(() => {
  //   let actualVideo = state.currentlyPlaying.videoID;
  //   dispatch({ type: 'changeSongPlaying', videoID: '0' });
  //   setTimeout(() => dispatch({ type: 'changeSongPlaying', videoID: actualVideo }), 20); // Delay needed to force update the player.
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.currentlyPlaying.timestamp]);

  function pauseVideo(player) {
    console.log('upstream pause for room ' + state.roomCode + " user " + state.username);
    socket.emit('pauseVideo', player.getCurrentTime(), state.roomCode, state.username);
  }
  function resumeVideo(player) {
    console.log('upstream resume for room ' + state.roomCode + " user " + state.username);
    socket.emit('resumeVideo', player.getCurrentTime(), state.roomCode, state.username);
  }

  useEffect(() => {
    console.log("should seek to " + state.seekTo);
    if(state.seekTo !== -1 && playerComponent.current !== null) {
      let player = playerComponent.current;
      player.playerInstance.seekTo(state.seekTo);
      state.seekTo = -1;
    }
  }, [state.seekTo]);

  return (
    <div className="YoutubePlayer">
      <YouTube
        ref={playerComponent}
        video={state.currentlyPlaying.videoID}
        startSeconds={state.currentlyPlaying.timestamp}
        autoplay
        disableKeyboard={true}
        paused={state.paused}
        onPause={(e) => pauseVideo(e.target)}
        onPlaying={(e) => resumeVideo(e.target)}
      />
    </div>
  );
}

export default YoutubePlayer;
