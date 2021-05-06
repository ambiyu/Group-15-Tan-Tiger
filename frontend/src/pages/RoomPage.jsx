import { useContext, useState } from 'react';
import React from 'react';
import {
  AppBar,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styles from './RoomPage.module.css';
import Playlist from '../components/Playlist';
import { RoomContext } from '../context/RoomContextProvider';
import Chatbox from '../components/Chatbox';


import YoutubePlayer from '../components/YoutubePlayer';
import SearchModal from '../components/SearchModal';

const useStyles = makeStyles(() => ({
  queueRoot: {
    display: 'flex',
    flexFlow: 'column',
    flex: 1,
  },
  queueTitle: {
    flexGrow: 1,
  },
}));

export default function RoomPage() {
  const classes = useStyles();
  const { state } = useContext(RoomContext);

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <>
      <Grid id='grid' container justify="center" spacing={0} className={styles.roomPage}>
        <Grid item className={styles.playlistPanel}>
          <Paper id='paper' className={classes.playlistRoot} style={{ height: '100%' }}>
            <AppBar id='appBar' color="transparent" position="static">
              <Toolbar id='ToolBar'>
                <Typography id='TypoGraphy' className={classes.queueTitle} variant="h6">
                  Queue
                </Typography>
                <IconButton id='iconButton' onClick={() => setSearchModalOpen(true)}>
                  <AddIcon id='addIcon' />
                </IconButton>
              </Toolbar>
            </AppBar>

            <Playlist id='playlist' playlist={state.queue} />
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
          <Chatbox/>
        </Grid>
      </Grid>

      <SearchModal open={searchModalOpen} setOpen={setSearchModalOpen} />
    </>
  );
}
