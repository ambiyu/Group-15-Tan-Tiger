const { fail } = require("assert");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const RoomManager = require("../../data/RoomManager");
const User = require("../../data/User");
const initEventHandlers = require("../RoomInitEvents");

// The styling of the tests is a combination of the socket io testing documentation, and the jest
// asyn code testing documentation, see: https://socket.io/docs/v4/testing/#Example-with-jest, and
// https://jestjs.io/docs/asynchronous for more info.

describe("How the server should respond to new users creating/joining rooms", () => {
    let io, serverSocket, clientSocket, roomManager, port;

    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);

        // Create a new room manager, will clear state for each test.
        roomManager = new RoomManager();

        httpServer.listen(() => {
            // const port = httpServer.address().port;
            port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;

                // These are the event handlers being tested.
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

    test("Can create a room", (done) => {
        // Simulate a client socket emitting the createRoom event - should create exactly one room
        // with the correct user name, roomname, and have a defined roomCode.
        clientSocket.emit("createRoom", "userName", "RoomName123", ({ user, roomCode }) => {
            try {
                expect(roomManager.getRoomByCode(roomCode)).toBeDefined();
                const roomFromManager = roomManager.getRoomByCode(roomCode);
                expect(roomFromManager.roomName).toBe("RoomName123");
                expect(roomFromManager.users.length).toBe(1);

                expect(user.userName).toBe("userName");

                const firstUser = roomFromManager.users[0];
                expect(firstUser.userName).toBe("userName");
                expect(Object.keys(roomManager.roomDict).length).toBe(1);

                done();
            } catch (error) {
                done(error);
            }
        });
    });

    test("Can join an already open room.", (done) => {
        // Artificially create a room, use generated roomCode so client can join in with joinRoom event.
        const user = new User("testUser1");
        const roomCode = roomManager.createNewRoom(user, "testRoom");
        expect(Object.keys(roomManager).length).toBe(1); // Check only a single room exists

        clientSocket.emit("joinRoom", roomCode, "testUser2", (room) => {
            try {
                expect(Object.keys(roomManager.roomDict).length).toBe(1); // No new room was created
                const roomFromManager = roomManager.getRoomByCode(roomCode);

                expect(roomFromManager.users.length).toBe(2); // Both users are in
                expect(roomFromManager.users[0].userName).toBe("testUser1");
                expect(roomFromManager.users[1].userName).toBe("testUser2");

                done();
            } catch (error) {
                done(error);
            }
        });
    });

    test("Verify client sockets get the newUserInRoomEvent, not others", async (done) => {
        const clientSockets = [];
        const roomCodes = [];

        // Helper function to create 2 sockets in separate rooms
        await connectAndCreateRoom(clientSockets, roomCodes, 0, port);
        await connectAndCreateRoom(clientSockets, roomCodes, 1, port);

        // First one is the room that another client will join. Test that this room has two clients
        // in it, and their usernames match what they should be.
        clientSockets[0].on("newUserInRoom", function (newUser) {
            try {
                expect(Object.keys(roomManager.roomDict).length).toBe(2); // 2 rooms in total
                const roomFromManager = roomManager.getRoomByCode(roomCodes[0]);
                expect(roomFromManager.users.length).toBe(2); // Both users are in
                expect(roomFromManager.users[0].userName).toBe("userName0"); // Based off the connectAndCreateRoom names.
                expect(roomFromManager.users[1].userName).toBe("userName2");
                done();
            } catch (error) {
                done(error);
            }
        });

        // Test should fail if client in other room receives this newUserInRoom message.
        clientSockets[1].on("newUserInRoom", function (newUser) {
            try {
                // If receive this, then fail
                console.log("Reached bad point!");
                fail();
            } catch (error) {
                done(error);
            }
        });

        // Have a third client join into the first room.
        await connectAndJoinRoom(clientSockets, roomCodes[0], 2, port);

        clientSockets[0].close();
        clientSockets[1].close();
        clientSockets[2].close();
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
