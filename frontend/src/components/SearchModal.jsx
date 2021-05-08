import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  IconButton,
  InputBase,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import { searchByQuery } from '../api/YoutubeApi';
import { useContext, useState } from 'react';
import { RoomContext } from '../context/RoomContextProvider';
import socket from '../Socket';

const useStyles = makeStyles(() => ({
  searchRoot: {
    paddingLeft: '10px',
    display: 'flex',
    border: '1px solid',
    width: '100%',
  },
  searchInput: {
    width: '100%',
  },
}));

export default function SearchModal({ open, setOpen }) {
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState([]);
  const { state } = useContext(RoomContext);

  async function handleSearch() {
    const query = document.getElementById('search-input').value;

    const results = await searchByQuery(query);
    if (results.length) {
      setSearchResults(results);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  }

  function handleAdd(item) {
    socket.emit('addToQueue', item, state.roomCode);
    // dispatch({ type: 'addToQueue', item });
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
      <DialogTitle>Add to Queue</DialogTitle>
      <DialogContent style={{ height: '70vh' }}>
        <Paper className={classes.searchRoot} component="form">
          <InputBase
            id="search-input"
            className={classes.searchInput}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="Search"
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Paper>

        <List>
          {searchResults.map((item, index) => (
            <ListItem key={index} dense>
              <ListItemAvatar>
                <Avatar src={item.thumbnail} variant="square" />
              </ListItemAvatar>
              <ListItemText primary={item.title} secondary={item.channel} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleAdd(item)}>
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
