import { Button, TextField, makeStyles } from '@material-ui/core';

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

  return (
    <form className={classes.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="nickname"
        label="Nickname"
        name="nickname"
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
      <Button fullWidth variant="contained" color="primary" className={classes.button}>
        Join Room
      </Button>
    </form>
  );
}
