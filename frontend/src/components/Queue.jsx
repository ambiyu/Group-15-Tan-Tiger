import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  makeStyles,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useState, useContext } from 'react';
import { RoomContext } from '../context/RoomContextProvider';
import SearchModal from './SearchModal';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  queueTitle: {
    flexGrow: 1,
  },
  queueList: {
    height: 'calc(100vh - 96px)',
    overflowY: 'auto',
    padding: 0,
  },
}));

export default function Queue() {
  const classes = useStyles();
  const { state } = useContext(RoomContext);

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar color="transparent" position="static">
        <Toolbar variant="dense">
          <Typography className={classes.queueTitle} variant="h6">
            Queue
          </Typography>
          <IconButton onClick={() => setSearchModalOpen(true)}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <List className={classes.queueList}>
        {state.queue.map((item, index) => (
          <ListItem key={index} divider dense>
            <ListItemAvatar>
              <Avatar src={item.thumbnail} variant="square" />
            </ListItemAvatar>
            <ListItemText primary={item.title} secondary={item.channel} />
          </ListItem>
        ))}
      </List>
      <SearchModal open={searchModalOpen} setOpen={setSearchModalOpen} />
    </div>
  );
}
