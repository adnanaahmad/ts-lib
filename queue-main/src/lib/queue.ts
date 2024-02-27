import bull, { Job, JobOptions, QueueOptions } from 'bull';
import { RedisOptions } from 'ioredis';

let REDIS_URL = process.env.REDIS;
let REDIS_ENABLE_READY_CHECK = false;
let REDIS_MAX_RETRIES_PER_REQUEST = 10;
const queues: Map<string, bull.Queue> = new Map();

const PREFIX = process.env.INSTANCE_ID;

/**
 * JobOptions which keep all completed jobs
 */
export const jobOptsKeep: JobOptions = {
  removeOnComplete: false,
};

/**
 * JobOptions which remove all completed jobs
 */
export const jobOptsRemove: JobOptions = {
  removeOnComplete: true,
};

/**
 * JobOptions which retry all failed jobs with a fixed backoff
 */
export const jobOptsRetry: JobOptions = {
  attempts: 3,
  backoff: 30000,
  removeOnComplete: true,
};

/**
 * Updates the Redis URL to the provided string
 * 
 * @param {string} redisUrl: The URL to which the Redis URL should be updated
 */
export const setRedisUrl = (redisUrl: string): void => {
  REDIS_URL = redisUrl;
};

/**
 * Updates the Max retries per request for Redis
 * 
 * @param {number} retriesPerRequest: The max number of retries per request
 */
export const setRedisMaxRetriesPerRequest = (retriesPerRequest: number): void => {
  REDIS_MAX_RETRIES_PER_REQUEST = retriesPerRequest;
}

/**
 * Updates the enable ready check parameter for Redis
 * 
 * @param {number} enableReadyCheck: Whether the client will check that the Redis server
 *                                   is fully ready before emitting the 'ready' event
 */
export const setRedisEnableReadyCheck = (enableReadyCheck: boolean): void => {
  REDIS_ENABLE_READY_CHECK = enableReadyCheck;
}

/**
 * Creates Redis options from a provided URL.
 *
 * @param {string} url: The provided url used to generate the Redis options
 * @returns {RedisOptions} The Redis options generated from this url
 */
export const redisOptsFromUrl = (url: string): RedisOptions => {
  const redisOpts: RedisOptions = {};
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
  } catch (e) {
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
export const checkQueueExists = (key: string): boolean => {
  return queues.has(key);
}

/**
 * Gets the queue with the provided key. If no such queue exists then it creates one.
 * 
 * @param {string} key: Key used to uniquely identify the queue
 * @param {QueueOptions} queueOptions: Optional QueueOptions to be used if the queue does not exist
 * @returns {bull.Queue} The created queue
 */
export const getQueue = (key: string, queueOptions?: QueueOptions): bull.Queue => {
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
export const setQueue = (
  key: string,
  redisUrl?: string,
  queueOptions?: QueueOptions
): bull.Queue => {
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
export const deleteQueue = (key: string): boolean => {
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
export const addQueue = (key: string, data: unknown, jobOptions?: JobOptions): Promise<Job> => {
  try {
    const queue = getQueue(key);
    jobOptions = jobOptions || jobOptsRemove;
    return queue.add(data, jobOptions);
  } catch (error) {
    console.error(error);
  }
  return Promise.reject("Unable to create new job");
};
