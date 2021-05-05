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
      return {
        ...state,
        paused: true
      }
    }
    case 'resumeVideo': {
      return {
        ...state,
        paused: false
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
    function pauseVideo() {
      dispatch({type: 'pauseVideo'});
    }
    function resumeVideo() {
      dispatch({type: 'resumeVideo'});
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
