"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addQueue = exports.deleteQueue = exports.setQueue = exports.getQueue = exports.checkQueueExists = exports.redisOptsFromUrl = exports.setRedisEnableReadyCheck = exports.setRedisMaxRetriesPerRequest = exports.setRedisUrl = exports.jobOptsRetry = exports.jobOptsRemove = exports.jobOptsKeep = void 0;
const bull_1 = __importDefault(require("bull"));
let REDIS_URL = process.env.REDIS;
let REDIS_ENABLE_READY_CHECK = false;
let REDIS_MAX_RETRIES_PER_REQUEST = 10;
const queues = new Map();
const PREFIX = process.env.INSTANCE_ID;
/**
 * JobOptions which keep all completed jobs
 */
exports.jobOptsKeep = {
    removeOnComplete: false,
};
/**
 * JobOptions which remove all completed jobs
 */
exports.jobOptsRemove = {
    removeOnComplete: true,
};
/**
 * JobOptions which retry all failed jobs with a fixed backoff
 */
exports.jobOptsRetry = {
    attempts: 3,
    backoff: 30000,
    removeOnComplete: true,
};
/**
 * Updates the Redis URL to the provided string
 *
 * @param {string} redisUrl: The URL to which the Redis URL should be updated
 */
const setRedisUrl = (redisUrl) => {
    REDIS_URL = redisUrl;
};
exports.setRedisUrl = setRedisUrl;
/**
 * Updates the Max retries per request for Redis
 *
 * @param {number} retriesPerRequest: The max number of retries per request
 */
const setRedisMaxRetriesPerRequest = (retriesPerRequest) => {
    REDIS_MAX_RETRIES_PER_REQUEST = retriesPerRequest;
};
exports.setRedisMaxRetriesPerRequest = setRedisMaxRetriesPerRequest;
/**
 * Updates the enable ready check parameter for Redis
 *
 * @param {number} enableReadyCheck: Whether the client will check that the Redis server
 *                                   is fully ready before emitting the 'ready' event
 */
const setRedisEnableReadyCheck = (enableReadyCheck) => {
    REDIS_ENABLE_READY_CHECK = enableReadyCheck;
};
exports.setRedisEnableReadyCheck = setRedisEnableReadyCheck;
/**
 * Creates Redis options from a provided URL.
 *
 * @param {string} url: The provided url used to generate the Redis options
 * @returns {RedisOptions} The Redis options generated from this url
 */
const redisOptsFromUrl = (url) => {
    const redisOpts = {};
    try {
        const redisUrl = new URL(url);
        redisOpts.port = Number(redisUrl.port) || 6379;
        redisOpts.host = redisUrl.hostname;
        redisOpts.db = redisUrl.pathname
            ? Number(redisUrl.pathname.split('/')[1])
            : 0;
        redisOpts.password = redisUrl.password;
        redisOpts.enableReadyCheck = REDIS_ENABLE_READY_CHECK;
        redisOpts.maxRetriesPerRequest = REDIS_MAX_RETRIES_PER_REQUEST;
    }
    catch (e) {
        console.log(e);
    }
    return redisOpts;
};
exports.redisOptsFromUrl = redisOptsFromUrl;
/**
 * Checks if the queue with the given key already exists.
 *
 * @param {string} key: Key used to uniquely identify the queue
 * @returns {boolean} Whether the queue exists
 */
const checkQueueExists = (key) => {
    return queues.has(key);
};
exports.checkQueueExists = checkQueueExists;
/**
 * Gets the queue with the provided key. If no such queue exists then it creates one.
 *
 * @param {string} key: Key used to uniquely identify the queue
 * @param {QueueOptions} queueOptions: Optional QueueOptions to be used if the queue does not exist
 * @returns {bull.Queue} The created queue
 */
const getQueue = (key, queueOptions) => {
    return queues.get(key) || (0, exports.setQueue)(key, undefined, queueOptions);
};
exports.getQueue = getQueue;
/**
 * Updates the queue with the provided key to a new key with the provided URL and options.
 *
 * @param {string} key: Key used to uniquely identify the created queue
 * @param {string} redisUrl: Optional Redis URL to be used for the created queue
 * @param {QueueOptions} options: Optional QueueOptions to be used by the created queue
 * @returns {bull.Queue} The created queue
 */
const setQueue = (key, redisUrl, queueOptions) => {
    redisUrl = redisUrl || REDIS_URL;
    if (redisUrl) {
        queueOptions = Object.assign(Object.assign({}, (queueOptions || exports.jobOptsRemove)), { redis: (0, exports.redisOptsFromUrl)(redisUrl) });
    }
    if (PREFIX) {
        queueOptions = queueOptions || {};
        queueOptions.prefix = PREFIX;
    }
    const queue = new bull_1.default(key, redisUrl || '', queueOptions);
    queues.set(key, queue);
    return queue;
};
exports.setQueue = setQueue;
/**
 * Deletes the queue associated with the provided key.
 *
 * @param {string} key: Key used to uniquely identify the queue to be deleted
 * @returns {boolean} True if a queue with the key was deleted, false if no such queue existed
 */
const deleteQueue = (key) => {
    return queues.delete(key);
};
exports.deleteQueue = deleteQueue;
/**
 * Creates a Job with the provided data for the queue with the provided key. Creates a new queue
 * if no such queue exists.
 *
 * @param {string} key: Key used to uniquely identify the queue for which the job should be created
 * @param {unknown} data: Data for the job to be created
 * @param {JobOptions} jobOptions: Optional options used for this job. Defaults to jobOptsRemove which
 *                                 removes completed jobs
 * @returns {Promise<Job>} A Promise with the new Job or a failure reason
 */
const addQueue = (key, data, jobOptions) => {
    try {
        const queue = (0, exports.getQueue)(key);
        jobOptions = jobOptions || exports.jobOptsRemove;
        return queue.add(data, jobOptions);
    }
    catch (error) {
        console.error(error);
    }
    return Promise.reject("Unable to create new job");
};
exports.addQueue = addQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3F1ZXVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdEQUEyRDtBQUczRCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztBQUNsQyxJQUFJLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQUNyQyxJQUFJLDZCQUE2QixHQUFHLEVBQUUsQ0FBQztBQUN2QyxNQUFNLE1BQU0sR0FBNEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUVsRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztBQUV2Qzs7R0FFRztBQUNVLFFBQUEsV0FBVyxHQUFlO0lBQ3JDLGdCQUFnQixFQUFFLEtBQUs7Q0FDeEIsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxhQUFhLEdBQWU7SUFDdkMsZ0JBQWdCLEVBQUUsSUFBSTtDQUN2QixDQUFDO0FBRUY7O0dBRUc7QUFDVSxRQUFBLFlBQVksR0FBZTtJQUN0QyxRQUFRLEVBQUUsQ0FBQztJQUNYLE9BQU8sRUFBRSxLQUFLO0lBQ2QsZ0JBQWdCLEVBQUUsSUFBSTtDQUN2QixDQUFDO0FBRUY7Ozs7R0FJRztBQUNJLE1BQU0sV0FBVyxHQUFHLENBQUMsUUFBZ0IsRUFBUSxFQUFFO0lBQ3BELFNBQVMsR0FBRyxRQUFRLENBQUM7QUFDdkIsQ0FBQyxDQUFDO0FBRlcsUUFBQSxXQUFXLGVBRXRCO0FBRUY7Ozs7R0FJRztBQUNJLE1BQU0sNEJBQTRCLEdBQUcsQ0FBQyxpQkFBeUIsRUFBUSxFQUFFO0lBQzlFLDZCQUE2QixHQUFHLGlCQUFpQixDQUFDO0FBQ3BELENBQUMsQ0FBQTtBQUZZLFFBQUEsNEJBQTRCLGdDQUV4QztBQUVEOzs7OztHQUtHO0FBQ0ksTUFBTSx3QkFBd0IsR0FBRyxDQUFDLGdCQUF5QixFQUFRLEVBQUU7SUFDMUUsd0JBQXdCLEdBQUcsZ0JBQWdC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