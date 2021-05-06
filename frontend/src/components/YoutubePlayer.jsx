import React from 'react'
import YouTube from '@u-wave/react-youtube';
import {useEffect, useContext} from 'react';
import { RoomContext } from '../context/RoomContextProvider';

function YoutubePlayer() {
    const { state, dispatch } = useContext(RoomContext);
    console.log(state);

  useEffect(() => {
    let actualVideo = state.currentlyPlaying.videoURL;
    dispatch({type: 'changeSongPlaying', videoURL: '0'});
    setTimeout(() => dispatch({type: 'changeSongPlaying', videoURL: actualVideo}), 20); // Delay needed to force update the player.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentlyPlaying.timestamp]);

  return (
    <div className="YoutubePlayer">
      <YouTube video={state.currentlyPlaying.videoURL} startSeconds={state.currentlyPlaying.timestamp} autoplay disableKeyboard={true} controls={false}/>
    </div>
  );
}

export default YoutubePlayer;