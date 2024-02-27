import test from 'ava';

import { checkQueueExists, deleteQueue, getQueue, redisOptsFromUrl, setQueue, setRedisEnableReadyCheck, setRedisMaxRetriesPerRequest } from './queue';

test('redisOptsFromUrl_generatesCorrectOptions', async (t) => {
    const inputUrl = "rediss://abc:xyz@1.2.3.4:5/6";

    const result = redisOptsFromUrl(inputUrl);

    t.is(result.port, 5);
    t.is(result.host, '1.2.3.4');
    t.is(result.db, 6);
    t.is(result.password, 'xyz');
    t.false(result.enableReadyCheck);
    t.is(result.maxRetriesPerRequest, 10);
});

test('setRedisMaxRetriesPerRequest_setsParameter', async (t) => {
    const inputMaxRetries = 20;
    const inputUrl = "rediss://abc:xyz@1.2.3.4:5/6";

    setRedisMaxRetriesPerRequest(inputMaxRetries);
    const result = redisOptsFromUrl(inputUrl);

    t.is(result.maxRetriesPerRequest, inputMaxRetries);
});

test('setRedisEnableReadyCheck_setsParameter', async (t) => {
    const inputRedisEnableReadyCheck = true;
    const inputUrl = "rediss://abc:xyz@1.2.3.4:5/6";

    setRedisEnableReadyCheck(inputRedisEnableReadyCheck);
    const result = redisOptsFromUrl(inputUrl);

    t.true(result.enableReadyCheck);
});

test('checkQueueExists_noQueue_returnsFalse', async (t) => {
    const inputQueueKey = 'checkQueueExists_noQueue_returnsFalse';

    const result = checkQueueExists(inputQueueKey);

    t.false(result);
});

test('checkQueueExists_queueExists_returnsTrue', async (t) => {
    const inputQueueKey = 'checkQueueExists_queueExists_returnsTrue';

    setQueue(inputQueueKey);
    const result = checkQueueExists(inputQueueKey);

    t.true(result);
});

test('getQueue_noQueue_returnsNewOne', async (t) => {
    const inputQueueKey = 'test_getQueue_noQueue_returnsNewOne';

    const result = getQueue(inputQueueKey, undefined);

    t.is(result.name, inputQueueKey);
});

test('getQueue_alreadyExists_returnsExistingOne', async (t) => {
    const inputQueueKey = 'getQueue_alreadyExists_returnsExistingOne';

    const result = getQueue(inputQueueKey, undefined);
    const result_2 = getQueue(inputQueueKey, undefined);

    t.is(result.name, inputQueueKey);
    t.is(result, result_2);
})

test('setQueue_noQueue_createsNewQueue', async (t) => {
    const inputQueueKey = 'setQueue_noQueue_createsNewQueue';

    const result = setQueue(inputQueueKey);
    const result_get = getQueue(inputQueueKey);

    t.is(result, result_get);
});

test('setQueue_existingQueue_updatesQueue', async (t) => {
    const inputQueueKey = 'setQueue_noQueue_createsNewQueue';

    const result = setQueue(inputQueueKey);
    const result_2 = setQueue(inputQueueKey);
    const result_get_2 = getQueue(inputQueueKey);

    t.not(result, result_2);
    t.is(result_2, result_get_2);
});

test('deleteQueue_removesExistingQueue', async (t) => {
    const inputQueueKey = 'setQueue_noQueue_createsNewQueue';

    const result = setQueue(inputQueueKey);
    deleteQueue(inputQueueKey);
    const result_2 = getQueue(inputQueueKey);

    t.not(result, result_2);
})