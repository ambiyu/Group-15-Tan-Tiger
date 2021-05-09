import { React, useState, useRef, useEffect } from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context/RoomContextProvider';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Input,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import socket from '../Socket';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  header: {
    paddingBottom: 4,
  },
  content: {
    height: (isMobile) => (isMobile ? 'calc(100% - 108px)' : 'calc(100vh - 150px)'),
    paddingTop: 0,
    overflow: 'auto',
  },
  actionContainer: {
    position: 'absolute',
    bottom: (isMobile) => (isMobile ? 56 : 0),
  },
  sendButton: {
    position: 'absolute',
    float: 'right',
  },
});

export default function Chatbox() {
  const { state } = useContext(RoomContext);
  const isMobile = useMediaQuery('(max-width:600px)');

  // typingMessage is on user side, what has been typed but not sent
  const [typingMessage, setTypingMessage] = useState('');

  const lastMessageRef = useRef(null);

  const classes = useStyles(isMobile);

  function handleSendMessage(typingMessage) {
    const message = {
      username: state.username,
      content: typingMessage,
    };
    // Send message to server, this will broadcast to all in room, see useRoomState and the
    // socket.on('newMessage', ...) for how the message state is stored. The subsequent dispatch()
    // call will cause a re-render, so state.chatMessage will be up to date.
    socket.emit('sendingMessage', message, state.roomCode);
    setTypingMessage('');
  }

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ smooth: true });
    }
  }, [state.chatMessages]);

  return (
    <Card className={classes.root}>
      <CardHeader title="Chat" className={classes.header} />
      <List className={classes.content}>
        {state.chatMessages.map((message, key) => {
          const lastMessage = state.chatMessages.length - 1 === key;
          return (
            <ListItem
              dense
              key={key}
              divider
              alignItems="flex-start"
              ref={lastMessage ? lastMessageRef : null}
            >
              <ListItemAvatar>
                <Avatar alt={message.username} src="" />
              </ListItemAvatar>
              <ListItemText>
                <Typography style={{ fontWeight: 'bold' }}>{message.username}: </Typography>
                <Typography>{message.content}</Typography>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
      <CardActions className={classes.actionContainer}>
        <Input
          type="text"
          placeholder="New message..."
          value={typingMessage}
          onChange={(e) => {
            setTypingMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && typingMessage) {
              handleSendMessage(typingMessage);
            }
          }}
        />
        <Button
          onClick={() => {
            if (typingMessage) {
              handleSendMessage(typingMessage);
            }
          }}
        >
          Send
        </Button>
      </CardActions>
    </Card>
  );
}
