import { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import styles from './RoomPage.module.css';
import Playlist from '../components/Playlist';

export default function RoomPage({ roomCode }) {
  const [users, setUsers] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [currentVideo, setCurrentVideo] = useState('');

  return (
    <Grid container justify="center" spacing={0} className={styles.roomPage}>
      <Grid item className={styles.playlistPanel}>
        <Paper style={{ height: '100%' }}>
          <Playlist playlist={playlist} />
        </Paper>
      </Grid>
      <Grid item className={styles.middlePanel}>
        <Paper style={{ height: '100%' }}>Player</Paper>
      </Grid>
      <Grid item className={styles.chatPanel}>
        <Paper style={{ height: '100%' }}>Chat</Paper>
      </Grid>
    </Grid>
  );
}
