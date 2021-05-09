const { fail } = require("assert");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const RoomManager = require("../../data/RoomManager");
const User = require("../../data/User");
const inRoomEvents = require("../InRoomEvents");
const initEventHandlers = require("../RoomInitEvents");
const Timer = require("tiny-timer");

// The styling of the tests is a combination of the socket io testing documentation, and the jest
// asyn code testing documentation, see: https://socket.io/docs/v4/testing/#Example-with-jest, and
// https://jestjs.io/docs/asynchronous for more info.

describe("How the server should respond when users manipulate room state such as changing the music/video queue", () => {
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
                inRoomEvents(io, socket, roomManager);

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

    // TODO: After possible refactoring of youtube api calls to backend
    xtest("A user can add a youtube link to the queue", async (done) => {
        const clientSockets = [];
        const roomCodes = [];

        await connectAndCreateRoom(clientSockets, roomCodes, 0, port);

        // Have a second client join into the first room.
        await connectAndJoinRoom(clientSockets, roomCodes[0], 1, port);
        const roomFromManager = roomManager.getRoomByCode(roomCodes[0]);

        clientSockets[0].on("addToQueue", function (message) {
            try {
                expect(roomFromManager.queue.length).toBe(1); // Both users are in
                done();
            } catch (error) {
                done(error);
            }
        });

        const sentItem = {
            videoID: "aaaaaaaaaaa",
            test: "lol",
            channel: "olo",
            thumbnail: ".........",
        };

        expect(roomFromManager.queue.length).toBe(0); // Initially nothing in the queue
        // Simulate frontend using sendingMessage event, has message and the roomcode sent.
        clientSockets[0].emit("addToQueue", sentItem, roomCodes[0]);
    });

    test("The host user can pause the video", async (done) => {
        const clientSockets = [];
        const roomCodes = [];

        await connectAndCreateRoom(clientSockets, roomCodes, 0, port);
        await connectAndJoinRoom(clientSockets, roomCodes[0], 1, port);

        // Simulate as if video is playing
        const roomFromManager = roomManager.getRoomByCode(roomCodes[0]);
        roomFromManager.paused = false;
        roomFromManager.currentlyPlaying.timestamp = new Timer({ stopwatch: true });

        clientSockets[1].on("pauseVideo", function (pauseTime, roomCode, user) {
            try {
                expect(roomFromManager.paused).toBe(true);
                done();
            } catch (error) {
                done(error);
            }
        });

        clientSockets[0].emit("pauseVideo", 1, roomCodes[0], "userName0");
    });

    test("Non hosts cannot cause a pause state", async (done) => {
        const clientSockets = [];
        const roomCodes = [];

        await connectAndCreateRoom(clientSockets, roomCodes, 0, port);
        await connectAndJoinRoom(clientSockets, roomCodes[0], 1, port);

        // Simulate as if video is playing
        const roomFromManager = roomManager.getRoomByCode(roomCodes[0]);
        roomFromManager.paused = false;

        // Simulate frontend using sendingMessage event, has message and the roomcode sent.
        clientSockets[1].emit("pauseVideo", 1, roomCodes[0], "userName1");

        setTimeout(function () {
            expect(roomFromManager.paused).toBe(false);
            done();
        }, 200); // Ensure time taken for any possible server responses.
    });

    async function connectAndCreateRoom(clientSockets, roomCodes, index, port) {
        return new Promise((resolve) => {
            clientSockets[index] = new Client(`http://localhost:${port}`);
            clientSockets[index].on("connect", () => {
                clientSockets[index].emit(
                    "createRoom",
                    `userName${index}`,
                    `RoomName${index}`,
                    ({ user, roomCode }) => {
                        roomCodes[index] = roomCode;
                        resolve();
                    }
                );
            });
        });
    }

    async function connectAndJoinRoom(clientSockets, roomCode, index, port) {
        return new Promise((resolve) => {
            clientSockets[index] = new Client(`http://localhost:${port}`);
            clientSockets[index].on("connect", () => {
                clientSockets[index].emit("joinRoom", roomCode, `userName${index}`, ({ room }) => {
                    resolve();
                });
            });
        });
    }
});
