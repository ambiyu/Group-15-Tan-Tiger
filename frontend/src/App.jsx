import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import RoomPage from './pages/RoomPage';
import CreateJoinRoomPage from './pages/CreateJoinRoomPage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    height: '100vh',
    flex: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  main: {
    height: '100%',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" color="inherit">
            Dank memes
          </Typography>
          <Typography variant="h6" color="inherit">
            Room Code: 12345
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.main}>
        <Switch>
          <Route path="/room">
            <RoomPage />
          </Route>

          <Route path="/">
            <CreateJoinRoomPage />
          </Route>

          <Route path="*">
            <Redirect to="/room" />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
