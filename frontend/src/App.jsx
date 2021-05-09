import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import RoomPage from './pages/RoomPage';
import CreateJoinRoomPage from './pages/CreateJoinRoomPage';
import { RoomContext } from './context/RoomContextProvider';
import { useContext } from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import octopusDeploy from '@iconify-icons/logos/octopus-deploy';


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
  const { state } = useContext(RoomContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton className={classes.menuButton} edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" color="inherit">
            {state.roomName ? state.roomName : 'Dank Memes'}
          </Typography>
          <Typography variant="h6" color="inherit">
            {state.roomCode && 'Room Code: ' + state.roomCode}
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container  justify="center">
        <Grid item align="center"  >
          <Typography marginTop="10" color="primary" align="center" variant="h2" gutterBottom>OctoTube</Typography>
        </Grid>
        <Grid>
          <Icon icon={octopusDeploy} fontSize="large" />
        </Grid>
      </Grid>

      <main className={classes.main}>
        <Switch>
          <Route path="/room/:roomCode">
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
