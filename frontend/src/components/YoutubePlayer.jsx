import React from 'react';
import { makeStyles } from '@material-ui/core';
import YouTube from '@u-wave/react-youtube';
import { useContext, useEffect, useRef } from 'react';
import { RoomContext } from '../context/RoomContextProvider';
import socket from '../Socket';

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
  },
  player: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

function YoutubePlayer() {
  const classes = useStyles();
  const { state } = useContext(RoomContext);
  let playerComponent = useRef(null);
  const video = state.currentlyPlaying.video;
  const timestamp = Math.ceil(state.currentlyPlaying.timestamp);

  // useEffect(() => {
  //   let actualVideo = state.currentlyPlaying.videoID;
  //   dispatch({ type: 'changeSongPlaying', videoID: '0' });
  //   setTimeout(() => dispatch({ type: 'changeSongPlaying', videoID: actualVideo }), 20); // Delay needed to force update the player.
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.currentlyPlaying.timestamp]);

  function handlePauseVideo(player) {
    console.log('upstream pause for room ' + state.roomCode + ' user ' + state.username);
    socket.emit('pauseVideo', player.getCurrentTime(), state.roomCode, state.username);
  }
  function handlePlayVideo(player) {
    console.log('upstream resume for room ' + state.roomCode + ' user ' + state.username);
    socket.emit('playVideo', player.getCurrentTime(), state.roomCode, state.username);
  }

  useEffect(() => {
    console.log('should seek to ' + state.seekTo);
    if (state.seekTo !== -1 && playerComponent.current !== null) {
      let player = playerComponent.current;
      player.playerInstance.seekTo(state.seekTo);
      state.seekTo = -1;
    }
  }, [state]);

  return (
    <div className={classes.container}>
      <YouTube
        className={classes.player}
        ref={playerComponent}
        video={video ? video.videoID : null}
        startSeconds={timestamp}
        autoplay
        disableKeyboard={true}
        paused={state.paused}
        onPause={(e) => handlePauseVideo(e.target)}
        onPlaying={(e) => handlePlayVideo(e.target)}
      />
    </div>
  );
}

export default YoutubePlayer;
