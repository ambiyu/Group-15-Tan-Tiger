const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 3000;

const initEventHandlers = require('./events/RoomInitEvents');

const RoomManager = require('./data/RoomManager');
// Handles storing information about all rooms - only in memory for now.
const roomManager = new RoomManager();

const io = require('socket.io')(server);

app.get('/', (req, resp) => {
    // As a way to send an initial html file.
    // resp.sendFile(__dirname + '/index.html');)
    resp.send('Hello world, server is running');
});

io.on('connection', (socket) => {
    console.log('A user has connected');

    initEventHandlers(io, socket, roomManager);
    
    // Handle when users disconnect from app
    socket.on('disconnect', () => {
        console.log('User has disconnected, bye!');
    })
});

server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Listening on port number: ${port}`);
});