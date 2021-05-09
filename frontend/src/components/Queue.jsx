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

const useStyles = makeStyles(() => ({
  queueTitle: {
    flexGrow: 1,
  },
}));

export default function Queue() {
  const classes = useStyles();
  const { state } = useContext(RoomContext);

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Typography className={classes.queueTitle} variant="h6">
            Queue
          </Typography>
          <IconButton onClick={() => setSearchModalOpen(true)}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <List>
        {state.queue.map((item, index) => (
          <>
            <ListItem key={index} divider dense>
              <ListItemAvatar>
                <Avatar src={item.thumbnail} variant="square" />
              </ListItemAvatar>
              <ListItemText primary={item.title} secondary={item.channel} />
            </ListItem>
          </>
        ))}
      </List>
      <SearchModal open={searchModalOpen} setOpen={setSearchModalOpen} />
    </>
  );
}
