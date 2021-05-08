import { useState, useRef, useEffect } from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context/RoomContextProvider';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, List, ListItem, ListItemAvatar, ListItemText, Input, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import socket from '../Socket';
import React from 'react';

const useStyles = makeStyles({
    chatBox: {
        display: 'grid',
        gridTemplateRows: '0.5fr 5fr',
        height: '100%',
        overflow: 'auto',
        maxHeight: '90vh',
        border: 'none',
        borderRadius: '5px',
    },
    content: {
        overflow: 'auto',
    },
    chatMessage: {
        display: 'flex'
    },
});

export default function Chatbox() {
    const { state } = useContext(RoomContext);

    // typingMessage is on user side, what has been typed but not sent
    const [typingMessage, setTypingMessage] = useState('');

    const scrollRef = useRef(null);

    const classes = useStyles();

    function handleSendMessage(typingMessage) {
        const message = {
            username: state.username,
            content: typingMessage
        }
        // Send message to server, this will broadcast to all in room, see useRoomState and the 
        // socket.on('newMessage', ...) for how the message state is stored. The subsequent dispatch()
        // call will cause a re-render, so state.chatMessage will be up to date.
        socket.emit('sendingMessage', message, state.roomCode);
        setTypingMessage('');
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" })
        }
    }, [state.chatMessages])

    return (
        <Card className={classes.chatBox}>
            <CardHeader title='Chat' />
            <CardContent className={classes.content}>
                <List>
                    {state.chatMessages.map((message, key) => {
                        return (
                            <ListItem key={key} divider alignItems='flex-start'>
                                <ListItemAvatar>
                                    <Avatar alt={message.username} src="" />
                                </ListItemAvatar>
                                <ListItemText className={classes.chatMessage}>
                                    <Typography>{message.username}: </Typography>
                                    <Typography >{message.content}</Typography>
                                </ListItemText>
                            </ListItem>
                        )
                    })}
                </List>
                {/* Dummy Div so when new message comes in, scroll to this div at bottom of window */}
                <ListItem ref={scrollRef} />
            </CardContent>
            <CardActions>
                <Input
                    type='text'
                    placeholder='New message...'
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
    )
};

