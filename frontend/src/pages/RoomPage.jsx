import { useContext, useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import styles from './RoomPage.module.css';
import Playlist from '../components/Playlist';
import { RoomContext } from '../context/RoomContextProvider';
import Chatbox from '../components/Chatbox';

export default function RoomPage() {
  const { state } = useContext(RoomContext);

  return (
    <Grid container justify="center" spacing={0} className={styles.roomPage}>
      <Grid item className={styles.playlistPanel}>
        <Paper style={{ height: '100%' }}>
          <Playlist playlist={state.queue} />
        </Paper>
      </Grid>
      <Grid item className={styles.middlePanel}>
        <Paper style={{ height: '100%' }}>
          {state.users.map((user, key) => (
            <li key={key}>{user.userName}</li>
          ))}
        </Paper>
      </Grid>
      <Grid item className={styles.chatPanel}>
        <Chatbox/>
      </Grid>
    </Grid>
  );
}
