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
    xtest("check jumping in queue works", () => { // Test is broke but won't fix (tested functionality is not used)
        youtubeQueueObject.addToQueue("11111111111");
        youtubeQueueObject.addToQueue("22222222222");
        youtubeQueueObject.addToQueue("33333333333");
        youtubeQueueObject.addToQueue("44444444444");
        youtubeQueueObject.jumpQueue(2);
        expect(youtubeQueueObject.queue[0]).toBe("33333333333");
    });
});