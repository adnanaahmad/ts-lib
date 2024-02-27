"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const queue_1 = require("./queue");
(0, ava_1.default)('redisOptsFromUrl_generatesCorrectOptions', async (t) => {
    const inputUrl = "rediss://abc:xyz@1.2.3.4:5/6";
    const result = (0, queue_1.redisOptsFromUrl)(inputUrl);
    t.is(result.port, 5);
    t.is(result.host, '1.2.3.4');
    t.is(result.db, 6);
    t.is(result.password, 'xyz');
    t.false(result.enableReadyCheck);
    t.is(result.maxRetriesPerRequest, 10);
});
(0, ava_1.default)('setRedisMaxRetriesPerRequest_setsParameter', async (t) => {
    const inputMaxRetries = 20;
    const inputUrl = "rediss://abc:xyz@1.2.3.4:5/6";
    (0, queue_1.setRedisMaxRetriesPerRequest)(inputMaxRetries);
    const result = (0, queue_1.redisOptsFromUrl)(inputUrl);
    t.is(result.maxRetriesPerRequest, inputMaxRetries);
});
(0, ava_1.default)('setRedisEnableReadyCheck_setsParameter', async (t) => {
    const inputRedisEnableReadyCheck = true;
    const inputUrl = "rediss://abc:xyz@1.2.3.4:5/6";
    (0, queue_1.setRedisEnableReadyCheck)(inputRedisEnableReadyCheck);
    const result = (0, queue_1.redisOptsFromUrl)(inputUrl);
    t.true(result.enableReadyCheck);
});
(0, ava_1.default)('checkQueueExists_noQueue_returnsFalse', async (t) => {
    const inputQueueKey = 'checkQueueExists_noQueue_returnsFalse';
    const result = (0, queue_1.checkQueueExists)(inputQueueKey);
    t.false(result);
});
(0, ava_1.default)('checkQueueExists_queueExists_returnsTrue', async (t) => {
    const inputQueueKey = 'checkQueueExists_queueExists_returnsTrue';
    (0, queue_1.setQueue)(inputQueueKey);
    const result = (0, queue_1.checkQueueExists)(inputQueueKey);
    t.true(result);
});
(0, ava_1.default)('getQueue_noQueue_returnsNewOne', async (t) => {
    const inputQueueKey = 'test_getQueue_noQueue_returnsNewOne';
    const result = (0, queue_1.getQueue)(inputQueueKey, undefined);
    t.is(result.name, inputQueueKey);
});
(0, ava_1.default)('getQueue_alreadyExists_returnsExistingOne', async (t) => {
    const inputQueueKey = 'getQueue_alreadyExists_returnsExistingOne';
    const result = (0, queue_1.getQueue)(inputQueueKey, undefined);
    const result_2 = (0, queue_1.getQueue)(inputQueueKey, undefined);
    t.is(result.name, inputQueueKey);
    t.is(result, result_2);
});
(0, ava_1.default)('setQueue_noQueue_createsNewQueue', async (t) => {
    const inputQueueKey = 'setQueue_noQueue_createsNewQueue';
    const result = (0, queue_1.setQueue)(inputQueueKey);
    const result_get = (0, queue_1.getQueue)(inputQueueKey);
    t.is(result, result_get);
});
(0, ava_1.default)('setQueue_existingQueue_updatesQueue', async (t) => {
    const inputQueueKey = 'setQueue_noQueue_createsNewQueue';
    const result = (0, queue_1.setQueue)(inputQueueKey);
    const result_2 = (0, queue_1.setQueue)(inputQueueKey);
    const result_get_2 = (0, queue_1.getQueue)(inputQueueKey);
    t.not(result, result_2);
    t.is(result_2, result_get_2);
});
(0, ava_1.default)('deleteQueue_removesExistingQueue', async (t) => {
    const inputQueueKey = 'setQueue_noQueue_createsNewQueue';
    const result = (0, queue_1.setQueue)(inputQueueKey);
    (0, queue_1.deleteQueue)(inputQueueKey);
    const result_2 = (0, queue_1.getQueue)(inputQueueKey);
    t.not(result, result_2);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcXVldWUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhDQUF1QjtBQUV2QixtQ0FBc0o7QUFFdEosSUFBQSxhQUFJLEVBQUMsMENBQTBDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3pELE1BQU0sUUFBUSxHQUFHLDhCQUE4QixDQUFDO0lBRWhELE1BQU0sTUFBTSxHQUFHLElBQUEsd0JBQWdCLEVBQUMsUUFBUSxDQUFDLENBQUM7SUFFMUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFBLGFBQUksRUFBQyw0Q0FBNEMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDM0QsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzNCLE1BQU0sUUFBUSxHQUFHLDhCQUE4QixDQUFDO0lBRWhELElBQUEsb0NBQTRCLEVBQUMsZUFBZSxDQUFDLENBQUM7SUFDOUMsTUFBTSxNQUFNLEdBQUcsSUFBQSx3QkFBZ0IsRUFBQyxRQUFRLENBQUMsQ0FBQztJQUUxQyxDQUFDLENB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