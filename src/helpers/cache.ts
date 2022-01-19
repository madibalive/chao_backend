import Redis from 'ioredis';

// For connection details check-out https://github.com/luin/ioredis#connect-to-redis
const connection = process.env.REDIS_URL || 6379;
// @ts-ignore
const client = new Redis(connection);

client.on('connect', (): void => console.log('Connected'));

client.on('error', (e: any): void => console.log(`Redis error: ${e}`));

client.on('reconnecting', (): void => console.log('Reconnecting redis ...'));

client.on('end', (): void => console.log('Redis ended'));

export const set = client.set;
export const get = client.get;

const pubClient = client;
const subClient = pubClient.duplicate();

export { client, pubClient, subClient };
