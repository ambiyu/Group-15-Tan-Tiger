import { useContext, useState } from 'react';
import React from 'react';
import { RoomContext } from '../context/RoomContextProvider';
import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import ChatIcon from '@material-ui/icons/Chat';
import PeopleIcon from '@material-ui/icons/People';
import styles from './RoomPage.module.css';
import Queue from '../components/Queue';
import Chatbox from '../components/Chatbox';
import YoutubePlayer from '../components/YoutubePlayer';

const useStyles = makeStyles(() => ({
  mobileNav: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
}));

export default function RoomPage() {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const { state } = useContext(RoomContext);

  const [mobileNav, setMobileNav] = useState(0);

  if (isMobile) {
    return (
      <>
        <YoutubePlayer />

        <div
          style={{
            display: mobileNav !== 0 ? 'none' : 'flex',
            flexDirection: 'column',
            height: `calc(100vh - 104px - ${window.innerWidth * 0.5625}px)`,
          }}
        >
          <Queue />
        </div>

        <Typography
          style={{ height: '100%', marginBottom: 56 }}
          component="div"
          hidden={mobileNav !== 1}
        >
          {state.users.map((user, key) => (
            <li key={key}>{user.userName}</li>
          ))}
        </Typography>

        <div
          style={{
            display: mobileNav !== 2 ? 'none' : 'flex',
            flexDirection: 'column',
            height: `calc(100vh - 104px - ${window.innerWidth * 0.5625}px)`,
          }}
        >
          <Chatbox />
        </div>

        <BottomNavigation
          className={classes.mobileNav}
          showLabels
          value={mobileNav}
          onChange={(e, newValue) => setMobileNav(newValue)}
        >
          <BottomNavigationAction label="Queue" icon={<QueueMusicIcon />} />
          <BottomNavigationAction label="Users" icon={<PeopleIcon />} />
          <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
        </BottomNavigation>
      </>
    );
  }

  return (
    <>
      <Grid id='grid' container justify="center" spacing={0} className={styles.roomPage}>
        <Grid item className={styles.playlistPanel}>
          <Paper style={{ height: '100%' }}>
            <Queue />
          </Paper>
        </Grid>
        <Grid item className={styles.middlePanel}>
          <Paper style={{ height: '100%' }}>
            <YoutubePlayer />
            {state.users.map((user, key) => (
              <li key={key}>{user.userName}</li>
            ))}
          </Paper>
        </Grid>
        <Grid item className={styles.chatPanel}>
          <Paper style={{ height: '100%' }}>
            <Chatbox />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
