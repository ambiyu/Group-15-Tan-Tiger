import YouTube from '@u-wave/react-youtube';
import { useEffect, useContext } from 'react';
import { RoomContext } from '../context/RoomContextProvider';

function YoutubePlayer() {
  const { state, dispatch } = useContext(RoomContext);
  console.log(state);

  useEffect(() => {
    let actualVideo = state.currentlyPlaying.videoID;
    dispatch({ type: 'changeSongPlaying', videoID: '0' });
    setTimeout(() => dispatch({ type: 'changeSongPlaying', videoID: actualVideo }), 20); // Delay needed to force update the player.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentlyPlaying.timestamp]);

  return (
    <div className="YoutubePlayer">
      <YouTube
        video={state.currentlyPlaying.videoID}
        startSeconds={state.currentlyPlaying.timestamp}
        autoplay
        disableKeyboard={true}
        controls={false}
        // onPause={(e) => console.log(e.target.getCurrentTime())}
      />
    </div>
  );
}

export default YoutubePlayer;
