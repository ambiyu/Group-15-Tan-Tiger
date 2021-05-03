import { useEffect, useReducer, useState } from 'react';
import socket from '../Socket';

const initialState = {
  username: '',
  roomCode: '',
  roomName: '',
  users: [],
  currentlyPlaying: {
    videoID: 'dQw4w9WgXcQ',
    timestamp: 0 // Changes whenever the host seeks to a new point in the song.
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
    case 'changeSongPlaying': {
      const {videoID} = action;
      return {
        ...state,
        currentlyPlaying: {
          ...state.currentlyPlaying,
          videoID: videoID
        }
      };
    }
    case 'addToQueue': {
      return {
        ...state,
        queue: [...state.queue, action.item],

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
    function onSongChanged(newSong) {
      //TODO: Retrieval of other video information
      dispatch({type: 'changeSongPlaying', newSong});
    }

    socket.on('newMessage', function(message) {
        console.log("Recevied message: " + message.content);
        dispatch({type: 'newMessage', message: message});
    })

    socket.on('newUserInRoom', onNewUserJoin);
    socket.on('changeSongPlaying', onSongChanged);

    return () => {
      socket.removeListener('newUserInRoom', onNewUserJoin);
      socket.removeListener('changeSongPlaying', onSongChanged);
      socket.removeListener('newMessage');
    };
  }, []);

  return [state, dispatch];
}
