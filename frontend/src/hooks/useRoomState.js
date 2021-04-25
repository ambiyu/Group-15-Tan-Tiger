import { useEffect, useReducer, useState } from 'react';
import socket from '../Socket';

const initialState = {
  username: '',
  roomCode: '',
  roomName: '',
  users: [],
  currentlyPlaying: {
    videoURL: 'dQw4w9WgXcQ',
    timestamp: 0 // Changes whenever the host seeks to a new point in the song.
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
    case 'changeSongPlaying': {
      const {videoURL} = action;
      return {
        ...state,
        currentlyPlaying: {
          ...state.currentlyPlaying,
          videoURL: videoURL
        }
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
    function onSongChanged(newSong) {
      //TODO: Retrieval of other video information
      dispatch({type: 'changeSongPlaying', newSong});
    }

    socket.on('newUserInRoom', onNewUserJoin);
    socket.on('changeSongPlaying', onSongChanged);

    return () => {
      socket.removeListener('newUserInRoom', onNewUserJoin);
      socket.removeListener('changeSongPlaying', onSongChanged);
    };
  }, []);

  return [state, dispatch];
}
