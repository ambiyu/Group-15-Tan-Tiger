import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core';

const dummyPlaylist = [
  {
    title: 'title',
    artist: 'artist',
    image:
      'https://www.pinclipart.com/picdir/middle/579-5791475_rocket-emoji-clipart-emoticon-cohete-png-download.png',
  },
];

export default function Playlist({ playlist }) {
  playlist = dummyPlaylist;

  return (
    <div>
      <List>
        {playlist.map((item, index) => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={item.image} />
              </ListItemAvatar>
              <ListItemText primary={item.title} secondary={item.artist} />
            </ListItem>
            {index !== playlist.length - 1 && <Divider component="li" />}
          </>
        ))}
      </List>
    </div>
  );
}
