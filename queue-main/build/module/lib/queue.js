import bull from 'bull';
let REDIS_URL = process.env.REDIS;
let REDIS_ENABLE_READY_CHECK = false;
let REDIS_MAX_RETRIES_PER_REQUEST = 10;
const queues = new Map();
const PREFIX = process.env.INSTANCE_ID;
/**
 * JobOptions which keep all completed jobs
 */
export const jobOptsKeep = {
    removeOnComplete: false,
};
/**
 * JobOptions which remove all completed jobs
 */
export const jobOptsRemove = {
    removeOnComplete: true,
};
/**
 * JobOptions which retry all failed jobs with a fixed backoff
 */
export const jobOptsRetry = {
    attempts: 3,
    backoff: 30000,
    removeOnComplete: true,
};
/**
 * Updates the Redis URL to the provided string
 *
 * @param {string} redisUrl: The URL to which the Redis URL should be updated
 */
export const setRedisUrl = (redisUrl) => {
    REDIS_URL = redisUrl;
};
/**
 * Updates the Max retries per request for Redis
 *
 * @param {number} retriesPerRequest: The max number of retries per request
 */
export const setRedisMaxRetriesPerRequest = (retriesPerRequest) => {
    REDIS_MAX_RETRIES_PER_REQUEST = retriesPerRequest;
};
/**
 * Updates the enable ready check parameter for Redis
 *
 * @param {number} enableReadyCheck: Whether the client will check that the Redis server
 *                                   is fully ready before emitting the 'ready' event
 */
export const setRedisEnableReadyCheck = (enableReadyCheck) => {
    REDIS_ENABLE_READY_CHECK = enableReadyCheck;
};
/**
 * Creates Redis options from a provided URL.
 *
 * @param {string} url: The provided url used to generate the Redis options
 * @returns {RedisOptions} The Redis options generated from this url
 */
export const redisOptsFromUrl = (url) => {
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
/**
 * Checks if the queue with the given key already exists.
 *
 * @param {string} key: Key used to uniquely identify the queue
 * @returns {boolean} Whether the queue exists
 */
export const checkQueueExists = (key) => {
    return queues.has(key);
};
/**
 * Gets the queue with the provided key. If no such queue exists then it creates one.
 *
 * @param {string} key: Key used to uniquely identify the queue
 * @param {QueueOptions} queueOptions: Optional QueueOptions to be used if the queue does not exist
 * @returns {bull.Queue} The created queue
 */
export const getQueue = (key, queueOptions) => {
    return queues.get(key) || setQueue(key, undefined, queueOptions);
};
/**
 * Updates the queue with the provided key to a new key with the provided URL and options.
 *
 * @param {string} key: Key used to uniquely identify the created queue
 * @param {string} redisUrl: Optional Redis URL to be used for the created queue
 * @param {QueueOptions} options: Optional QueueOptions to be used by the created queue
 * @returns {bull.Queue} The created queue
 */
export const setQueue = (key, redisUrl, queueOptions) => {
    redisUrl = redisUrl || REDIS_URL;
    if (redisUrl) {
        queueOptions = {
            ...(queueOptions || jobOptsRemove),
            redis: redisOptsFromUrl(redisUrl),
        };
    }
    if (PREFIX) {
        queueOptions = queueOptions || {};
        queueOptions.prefix = PREFIX;
    }
    const queue = new bull(key, redisUrl || '', queueOptions);
    queues.set(key, queue);
    return queue;
};
/**
 * Deletes the queue associated with the provided key.
 *
 * @param {string} key: Key used to uniquely identify the queue to be deleted
 * @returns {boolean} True if a queue with the key was deleted, false if no such queue existed
 */
export const deleteQueue = (key) => {
    return queues.delete(key);
};
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
export const addQueue = (key, data, jobOptions) => {
    try {
        const queue = getQueue(key);
        jobOptions = jobOptions || jobOptsRemove;
        return queue.add(data, jobOptions);
    }
    catch (error) {
        console.error(error);
    }
    return Promise.reject("Unable to create new job");
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3F1ZXVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBdUMsTUFBTSxNQUFNLENBQUM7QUFHM0QsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDbEMsSUFBSSx3QkFBd0IsR0FBRyxLQUFLLENBQUM7QUFDckMsSUFBSSw2QkFBNkIsR0FBRyxFQUFFLENBQUM7QUFDdkMsTUFBTSxNQUFNLEdBQTRCLElBQUksR0FBRyxFQUFFLENBQUM7QUFFbEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7QUFFdkM7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQWU7SUFDckMsZ0JBQWdCLEVBQUUsS0FBSztDQUN4QixDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQWU7SUFDdkMsZ0JBQWdCLEVBQUUsSUFBSTtDQUN2QixDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQWU7SUFDdEMsUUFBUSxFQUFFLENBQUM7SUFDWCxPQUFPLEVBQUUsS0FBSztJQUNkLGdCQUFnQixFQUFFLElBQUk7Q0FDdkIsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxRQUFnQixFQUFRLEVBQUU7SUFDcEQsU0FBUyxHQUFHLFFBQVEsQ0FBQztBQUN2QixDQUFDLENBQUM7QUFFRjs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sNEJBQTRCLEdBQUcsQ0FBQyxpQkFBeUIsRUFBUSxFQUFFO0lBQzlFLDZCQUE2QixHQUFHLGlCQUFpQixDQUFDO0FBQ3BELENBQUMsQ0FBQTtBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxnQkFBeUIsRUFBUSxF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