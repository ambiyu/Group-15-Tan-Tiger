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
  const playerRef = useRef(null);

  const video = state.currentlyPlaying.video;
  const timestamp = Math.ceil(state.currentlyPlaying.timestamp);

  useEffect(() => {
    if (state.seekTo !== -1 && playerRef.current !== null) {
      const player = playerRef.current;
      player.playerInstance.seekTo(state.seekTo);
      state.seekTo = -1;
    }
  }, [state]);

  function handlePauseVideo(player) {
    socket.emit('pauseVideo', player.getCurrentTime(), state.roomCode, state.username);
  }

  function handlePlayVideo(player) {
    socket.emit('playVideo', player.getCurrentTime(), state.roomCode, state.username);
  }

  return (
    <div className={classes.container}>
      <YouTube
        className={classes.player}
        ref={playerRef}
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
