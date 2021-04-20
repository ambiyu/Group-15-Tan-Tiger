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

export default function Create() {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="room-name"
        label="Room Name"
        name="room-name"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="nickname"
        label="Nickname"
        id="nickname"
      />
      <Button fullWidth variant="contained" color="primary" className={classes.button}>
        Create Room
      </Button>
    </form>
  );
}
