import { useEffect, useReducer } from 'react';
import socket from '../Socket';

const initialState = {
  username: '',
  roomCode: '',
  roomName: '',
  users: [],
  currentlyPlaying: {
    // video info
  },
  queue: [], // change name to just queue?
  chatMessages: [],
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

    socket.on('newUserInRoom', onNewUserJoin);

    return () => {
      socket.removeListener('newUserInRoom', onNewUserJoin);
    };
  }, []);

  return [state, dispatch];
}
