import Redis from 'ioredis';

// For connection details check-out https://github.com/luin/ioredis#connect-to-redis
const client = new Redis(); // Connect to 127.0.0.1:6379
client.on('connect', (): void => console.log('Connected'));

client.on('error', (e: any): void => console.log(`Redis error: ${e}`));

client.on('reconnecting', (): void => console.log('Reconnecting redis ...'));

client.on('end', (): void => console.log('Redis ended'));

export const set = client.set;
export const get = client.get;

const pubClient = client;
const subClient = pubClient.duplicate();

export { client, pubClient, subClient };
