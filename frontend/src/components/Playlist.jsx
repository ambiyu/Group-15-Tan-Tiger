import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { useContext } from 'react';
import { RoomContext } from '../context/RoomContextProvider';

export default function Playlist() {
  const { state } = useContext(RoomContext);

  return (
    <List>
      {state.queue.map((item, index) => (
        <>
          <ListItem key={index} dense>
            <ListItemAvatar>
              <Avatar src={item.thumbnail} variant="square" />
            </ListItemAvatar>
            <ListItemText primary={item.title} secondary={item.channel} />
          </ListItem>
          {index !== state.queue.length - 1 && <Divider component="li" />}
        </>
      ))}
    </List>
  );
}
