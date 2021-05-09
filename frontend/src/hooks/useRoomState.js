import { useEffect, useReducer } from 'react';
import socket from '../Socket';

const initialState = {
  username: '',
  roomCode: '',
  roomName: '',
  users: [],
  currentlyPlaying: {
    video: null,
    timestamp: 0, // Initial timestamp. Changes whenever the host seeks to a new point in the song.
  },
  queue: [],
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
        currentlyPlaying: {
          video: firstVideo,
          timestamp: 0,
        },
      };
    }
    case 'pauseVideo': {
      if (action.initiator === state.username) {
        return {
          ...state,
        };
      }
      if (action.newTime === undefined) {
        return {
          ...state,
          paused: true,
        };
      }
      return {
        ...state,
        paused: true,
        seekTo: action.newTime,
      };
    }
    case 'playVideo': {
      if (action.initiator === state.username) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        paused: false,
        seekTo: action.newTime,
      };
    }
    case 'newMessage': {
      const { message } = action;
      return {
        ...state,
        chatMessages: [...state.chatMessages, message],
      };
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
    function onAddToQueue(item) {
      dispatch({ type: 'addToQueue', item });
    }
    function playNextInQueue() {
      dispatch({ type: 'playNextInQueue' });
    }
    function pauseVideo(newTime, initiator) {
      // Initiator refers to the user that resumed the video
      dispatch({ type: 'pauseVideo', newTime, initiator });
    }
    function playVideo(newTime, initiator) {
      // Initiator refers to the user that resumed the video
      dispatch({ type: 'playVideo', newTime, initiator });
    }
    function onMessageReceived(message) {
      dispatch({ type: 'newMessage', message: message });
    }

    socket.on('newUserInRoom', onNewUserJoin);
    socket.on('addToQueue', onAddToQueue);
    socket.on('playNextInQueue', playNextInQueue);
    socket.on('pauseVideo', pauseVideo);
    socket.on('playVideo', playVideo);
    socket.on('newMessage', onMessageReceived);

    return () => {
      socket.removeListener('newUserInRoom', onNewUserJoin);
      socket.removeListener('addToQueue', onAddToQueue);
      socket.removeListener('playNextInQueue', playNextInQueue);
      socket.removeListener('pauseVideo', pauseVideo);
      socket.removeListener('playVideo', playVideo);
      socket.removeListener('newMessage', onMessageReceived);
    };
  }, []);

  return [state, dispatch];
}
