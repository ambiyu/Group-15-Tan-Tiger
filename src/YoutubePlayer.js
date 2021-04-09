import YouTube from '@u-wave/react-youtube';
import { YoutubeContext } from './App';
import {useContext, useEffect} from 'react';

function YoutubePlayer() {
  const context = useContext(YoutubeContext);
  const videoURL = context.videoURL;

  useEffect(() => {
    context.setVideoURL("0");
    setTimeout(() => context.setVideoURL(videoURL), 10); // Delay needed to force update the player.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.timestamp]);


  return (
    <div className="YoutubePlayer">
      <YouTube video={context.videoURL} startSeconds={context.timestamp} autoplay disableKeyboard={true} controls={false}/>
    </div>
  );
}

export default YoutubePlayer;