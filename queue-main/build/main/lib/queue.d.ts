import bull, { Job, JobOptions, QueueOptions } from 'bull';
import { RedisOptions } from 'ioredis';
/**
 * JobOptions which keep all completed jobs
 */
export declare const jobOptsKeep: JobOptions;
/**
 * JobOptions which remove all completed jobs
 */
export declare const jobOptsRemove: JobOptions;
/**
 * JobOptions which retry all failed jobs with a fixed backoff
 */
export declare const jobOptsRetry: JobOptions;
/**
 * Updates the Redis URL to the provided string
 *
 * @param {string} redisUrl: The URL to which the Redis URL should be updated
 */
export declare const setRedisUrl: (redisUrl: string) => void;
/**
 * Updates the Max retries per request for Redis
 *
 * @param {number} retriesPerRequest: The max number of retries per request
 */
export declare const setRedisMaxRetriesPerRequest: (retriesPerRequest: number) => void;
/**
 * Updates the enable ready check parameter for Redis
 *
 * @param {number} enableReadyCheck: Whether the client will check that the Redis server
 *                                   is fully ready before emitting the 'ready' event
 */
export declare const setRedisEnableReadyCheck: (enableReadyCheck: boolean) => void;
/**
 * Creates Redis options from a provided URL.
 *
 * @param {string} url: The provided url used to generate the Redis options
 * @returns {RedisOptions} The Redis options generated from this url
 */
export declare const redisOptsFromUrl: (url: string) => RedisOptions;
/**
 * Checks if the queue with the given key already exists.
 *
 * @param {string} key: Key used to uniquely identify the queue
 * @returns {boolean} Whether the queue exists
 */
export declare const checkQueueExists: (key: string) => boolean;
/**
 * Gets the queue with the provided key. If no such queue exists then it creates one.
 *
 * @param {string} key: Key used to uniquely identify the queue
 * @param {QueueOptions} queueOptions: Optional QueueOptions to be used if the queue does not exist
 * @returns {bull.Queue} The created queue
 */
export declare const getQueue: (key: string, queueOptions?: QueueOptions) => bull.Queue;
/**
 * Updates the queue with the provided key to a new key with the provided URL and options.
 *
 * @param {string} key: Key used to uniquely identify the created queue
 * @param {string} redisUrl: Optional Redis URL to be used for the created queue
 * @param {QueueOptions} options: Optional QueueOptions to be used by the created queue
 * @returns {bull.Queue} The created queue
 */
export declare const setQueue: (key: string, redisUrl?: string, queueOptions?: QueueOptions) => bull.Queue;
/**
 * Deletes the queue associated with the provided key.
 *
 * @param {string} key: Key used to uniquely identify the queue to be deleted
 * @returns {boolean} True if a queue with the key was deleted, false if no such queue existed
 */
export declare const deleteQueue: (key: string) => boolean;
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
export declare const addQueue: (key: string, data: unknown, jobOptions?: JobOptions) => Promise<Job>;
