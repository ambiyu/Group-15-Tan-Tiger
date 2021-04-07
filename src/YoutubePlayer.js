import YouTube from '@u-wave/react-youtube';
import { YoutubeContext } from './App';
import React from 'react';

function YoutubePlayer() {
  const context = React.useContext(YoutubeContext);
  return (
    <div className="YoutubePlayer">
      <YouTube video={context.videoURL} autoplay controls="false" disableKeyboard="true" annotations="false"/>
    </div>
  );
}

export default YoutubePlayer;