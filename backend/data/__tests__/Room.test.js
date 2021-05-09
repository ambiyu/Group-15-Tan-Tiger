const Room = require('../Room');

describe("backend unit tests for room", () => {
    let roomObject;
    beforeEach(() => {
        roomObject = new Room("123456", "roomName");
    });

    test("make sure room code and room name are stored properly", () => {
        expect(roomObject.roomCode).toBe("123456");
        expect(roomObject.roomName).toBe("roomName");
    })
});