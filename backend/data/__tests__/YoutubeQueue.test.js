const YoutubeQueue = require('../YoutubeQueue');

describe("backend unit tests for youtube queue", () => {
    let youtubeQueueObject;
    beforeEach(() => {
        youtubeQueueObject = new YoutubeQueue();
    });

    test("check song is added to queue", () => {
        youtubeQueueObject.addToQueue("12345678901");
        expect(youtubeQueueObject.queue[0]).toBe("12345678901");
    });

    test("check song is added to history", () => {
        youtubeQueueObject.addToQueue("12345678901");
        youtubeQueueObject.addToQueue("22222222222");
        youtubeQueueObject.advanceQueue();
        expect(youtubeQueueObject.history[0]).toBe("12345678901");
        expect(youtubeQueueObject.queue[0]).toBe("22222222222");
    });
});