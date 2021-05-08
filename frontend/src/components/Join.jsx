import { Button, TextField, makeStyles } from '@material-ui/core';
import { useContext } from 'react';
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

export default function Join() {
  const classes = useStyles();
  const history = useHistory();
  const { dispatch } = useContext(RoomContext);

  function handleJoin() {
    const username = document.getElementById('username').value;
    const roomCode = document.getElementById('room-code').value;

    socket.emit('joinRoom', roomCode, username, (room) => {
      if (room) {
        dispatch({ type: 'enterRoom', username, room });
        history.push(`/room/${roomCode}`);
      } else {
        window.alert('Invalid room code');
      }
    });
  }

  return (
    <form className={classes.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="room-code"
        label="Room Code"
        id="room-code"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleJoin}
      >
        Join Room
      </Button>
    </form>
  );
}
