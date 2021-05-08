const { fail } = require("assert");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const RoomManager = require('../../data/RoomManager');
const User = require('../../data/User');
const chatHandlers = require('../ChatEvents');
const initEventHandlers = require('../RoomInitEvents');

// The styling of the tests is a combination of the socket io testing documentation, and the jest 
// asyn code testing documentation, see: https://socket.io/docs/v4/testing/#Example-with-jest, and
// https://jestjs.io/docs/asynchronous for more info.

describe("How the server should respond when clients send messages", () => {
    let io, serverSocket, clientSocket, roomManager, port;
  
    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);

        // Create a new room manager, will clear state for each test.
        roomManager = new RoomManager();

        httpServer.listen(() => {
            port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;

                // These are the event handlers being tested.
                chatHandlers(io, socket, roomManager);

                // We need these to enter into rooms - ensure the test for these pass, see RoomInitEvents.test.js
                initEventHandlers(io, socket, roomManager);
            });
            clientSocket.on("connect", done);
        });
    });

    afterEach(() => {
        roomManager.clearAllData();
    });
  
    afterAll(() => {
        io.close();
        clientSocket.close();
    });

    test('Can send a message in the room', async (done) => {
        const clientSockets = [];
        const roomCodes = [];
    
        await connectAndCreateRoom(clientSockets, roomCodes, 0, port);

        // Have a second client join into the first room.
        await connectAndJoinRoom(clientSockets, roomCodes[0], 1, port);

        clientSockets[0].on('newMessage', function(message) {
            try {
                expect(message).toBe('Hello world');
                done();
            } catch (error){
                done(error);
            }
        });

        // Simulate frontend using sendingMessage event, has message and the roomcode sent.
        clientSockets[0].emit('sendingMessage', "Hello world", roomCodes[0]);
    }); 

    test('When sending message, clientSocket also receives newMessage event', async (done) => {
        // newMessage event used to update the frontend chat box - the sender of initial chat message needs to get as well.
        const clientSockets = [];
        const roomCodes = [];

        await connectAndCreateRoom(clientSockets, roomCodes, 0, port);
        clientSockets[0].on('newMessage', function(message) {
            try {
                expect(message).toBe('Hello world 2: Electric Boogaloo');
                done();
            } catch (error){
                done(error);
            }
        });
        // Simulate frontend using sendingMessage event, has message and the roomcode sent.
        clientSockets[0].emit('sendingMessage', "Hello world 2: Electric Boogaloo", roomCodes[0]);
    })


    test('Message only sent to the same room', async (done) => {
        const clientSockets = [];
        const roomCodes = [];

        // Helper function to create 2 sockets in separate rooms
        await connectAndCreateRoom(clientSockets, roomCodes, 0, port);
        await connectAndCreateRoom(clientSockets, roomCodes, 1, port);

        clientSockets[1].on('newMessage', function(message) {
            try {
                fail();
            } catch (error){
                done(error);
            }
        });

        // Simulate frontend using sendingMessage event - should not send to the roomCodes[1] room.
        clientSockets[0].emit('sendingMessage', "Hello world", roomCodes[0]);

        setTimeout(function(){ done(); }, 200); // Delay 0.2sec to make sure event was sent and didn't respond
    });

    async function connectAndCreateRoom(clientSockets, roomCodes, index, port){
        return new Promise((resolve) => {
            clientSockets[index] = new Client(`http://localhost:${port}`);
            clientSockets[index].on('connect', () => {
                clientSockets[index].emit('createRoom', `userName${index}`, `RoomName${index}`, ({ user, roomCode }) => {
                    roomCodes[index] = roomCode;
                    resolve();
                });
            });
        });
    }

    async function connectAndJoinRoom(clientSockets, roomCode, index, port){
        return new Promise((resolve) => {
            clientSockets[index] = new Client(`http://localhost:${port}`);
            clientSockets[index].on('connect', () => {
                clientSockets[index].emit('joinRoom', roomCode, `userName${index}`, ({ room }) => {
                    resolve();
                });
            });
        });
    };
});
