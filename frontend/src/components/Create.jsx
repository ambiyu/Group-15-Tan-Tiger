import { Button, TextField, makeStyles } from '@material-ui/core';
import React from 'react'
import {useContext } from 'react';
import { useHistory } from 'react-router';
import { RoomContext } from '../context/RoomContextProvider';
import socket from '../Socket';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const { dispatch } = useContext(RoomContext);

  function handleCreate() {
    const nickname = document.getElementById('username').value;
    const roomName = document.getElementById('room-name').value;

    socket.emit('createRoom', nickname, roomName, ({ user, roomCode }) => {
      dispatch({ type: 'createRoom', user, roomCode, roomName });
      history.push(`/room/${roomCode}`);
    });
  }

  return (
    <form className={classes.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="room-name2"
        label="Room Name"
        name="room-name"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="username"
        label="Username"
        id="username"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleCreate}
        id="button"
      >
        Create Room
      </Button>
    </form>
  );
}
