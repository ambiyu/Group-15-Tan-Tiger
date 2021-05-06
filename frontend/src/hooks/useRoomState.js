import { useEffect, useReducer } from 'react';
import socket from '../Socket';

const initialState = {
  username: '',
  roomCode: '',
  roomName: '',
  users: [],
  currentlyPlaying: {
    // videoID: 'dQw4w9WgXcQ',
    timestamp: 0, // Changes whenever the host seeks to a new point in the song.
  },
  queue: [], // change name to just queue?
  chatMessages: [],
  paused: true,
  seekTo: -1, // On non-negative value: triggers player to seek to that value and immediately resets to -1.
};

function reducer(state, action) {
  switch (action.type) {
    case 'enterRoom': {
      const { username, room } = action;
      return {
        ...state,
        username,
        ...room,
      };
    }
    case 'createRoom': {
      const { user, roomCode, roomName } = action;
      return {
        ...state,
        username: user.userName,
        roomCode,
        roomName,
        users: [user],
      };
    }
    case 'newUserJoined': {
      return {
        ...state,
        users: [...state.users, action.newUser],
      };
    }

    case 'changeSongPlaying': {
      const { videoID } = action;
      return {
        ...state,
        currentlyPlaying: {
          ...state.currentlyPlaying,
          videoID,
        },
      };
    }
    case 'addToQueue': {
      return {
        ...state,
        queue: [...state.queue, action.item],
      };
    }
    case 'playNextInQueue': {
      const firstVideo = state.queue[0];
      return {
        ...state,
        queue: state.queue.slice(1),
        currentlyPlaying: firstVideo,
      };
    }
    case 'pauseVideo': {
      console.log(action.initiator + "-" + state.username);
      if(action.initiator === state.username) {
        return {
          ...state
        };
      }
      if(action.newTime === undefined) {
        return {
          ...state,
          paused: true
        }
      }
      return {
        ...state,
        paused: true,
        seekTo: action.newTime
      }
    }
    case 'resumeVideo': {
      console.log(action.initiator + "-" + state.username);
      if(action.initiator === state.username) {
        return {
          ...state
        };
      }
      return {
        ...state,
        paused: false,
        seekTo: action.newTime
      }
    }
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

export default function useRoomState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    function onNewUserJoin(newUser) {
      dispatch({ type: 'newUserJoined', newUser });
    }
    function onSongChanged(newSong) {
      //TODO: Retrieval of other video information
      dispatch({ type: 'changeSongPlaying', newSong });
    }
    function onAddToQueue(item) {
      dispatch({ type: 'addToQueue', item });
    }
    function playNextInQueue() {
      dispatch({ type: 'playNextInQueue' });
    }
    function pauseVideo(newTime, initiator) { // Initiator refers to the user that resumed the video
      dispatch({type: 'pauseVideo', newTime, initiator});
    }
    function resumeVideo(newTime, initiator) { // Initiator refers to the user that resumed the video
      dispatch({type: 'resumeVideo', newTime, initiator});
    }

    socket.on('newUserInRoom', onNewUserJoin);
    socket.on('changeSongPlaying', onSongChanged);
    socket.on('addToQueue', onAddToQueue);
    socket.on('playNextInQueue', playNextInQueue);
    socket.on('pauseVideo', pauseVideo);
    socket.on('resumeVideo', resumeVideo);

    return () => {
      socket.removeListener('newUserInRoom', onNewUserJoin);
      socket.removeListener('changeSongPlaying', onSongChanged);
      socket.removeListener('addToQueue', onAddToQueue);
      socket.removeListener('playNextInQueue', playNextInQueue);
      socket.removeListener('pauseVideo', pauseVideo);
      socket.removeListener('resumeVideo', resumeVideo);
    };
  }, []);

  return [state, dispatch];
}
