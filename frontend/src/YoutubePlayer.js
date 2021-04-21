import YouTube from '@u-wave/react-youtube';
import {useEffect} from 'react';

function YoutubePlayer(props) {
  const [videoURL, setVideoURL] = props.videoState;

  useEffect(() => {
    setVideoURL("0");
    setTimeout(() => setVideoURL(videoURL), 10); // Delay needed to force update the player.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.timestamp]);


  return (
    <div className="YoutubePlayer">
      <YouTube video={props.videoState[0]} startSeconds={props.timestamp} autoplay disableKeyboard={true} controls={false}/>
    </div>
  );
}

export default YoutubePlayer;