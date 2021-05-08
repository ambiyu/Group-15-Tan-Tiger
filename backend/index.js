const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 4000;

const initEventHandlers = require('./events/RoomInitEvents');
const inRoomHandlers = require('./events/inRoomEvents');
const chatHandlers = require('./events/ChatEvents');

const RoomManager = require('./data/RoomManager');
// Handles storing information about all rooms - only in memory for now.
const roomManager = new RoomManager();

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

app.get('/', (req, resp) => {
    // As a way to serve an initial html file for testing backend events.
    resp.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user has connected');

    initEventHandlers(io, socket, roomManager);
    inRoomHandlers(io, socket, roomManager);
    chatHandlers(io, socket, roomManager);
    
    // Handle when users disconnect from app
    socket.on('disconnect', () => {
        console.log('User has disconnected, bye!');
    })
});

server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Listening on port number: ${port}`);
});