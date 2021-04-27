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
  musicQueue: [], // change name to just queue?
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
    case 'newMessage': {
      const { message } = action;
      return {
        ...state, 
        chatMessages: [...state.chatMessages, message],
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

    socket.on('newMessage', function(message) {
        console.log("Recevied message: " + message.content);
        dispatch({type: 'newMessage', message: message});
    })

    socket.on('newUserInRoom', onNewUserJoin);

    return () => {
      socket.removeListener('newUserInRoom', onNewUserJoin);
      socket.removeListener('newMessage');
    };
  }, []);

  return [state, dispatch];
}
