# @barbarians/queue

Library for queueing utility using Redis

In order to use this library you must set up Redis. For local setup download Redis from https://redis.io/.

Once you run the Redis server you can begin using the queueing library. 

The general recommendation is to keep your queue names in a central file location e.g.
```
const QUEUE_A_KEY = "a";

const queue_a = getQueue(QUEUE_A_KEY);
```

For setting this up on AWS use the AWS parameter store