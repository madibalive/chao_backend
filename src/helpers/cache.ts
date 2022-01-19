import Redis from 'ioredis';

// For connection details check-out https://github.com/luin/ioredis#connect-to-redis
const client = {};
// const client = new Redis({
//   port: 32000, // Redis port
//   host: 'ec2-3-223-225-24.compute-1.amazonaws.com', // Redis host
//   family: 4, // 4 (IPv4) or 6 (IPv6)
//   password: 'pce5dc9bf97e62e53ad5a144b1b26f4fe5f867e08a7821874265d931045f8af88',
//   db: 0,
//   tls: {
//     rejectUnauthorized: false,
//   },
// }); // 192.168.1.1:6379

// client.on('connect', (): void => console.log('Connected'));

// client.on('error', (e: any): void => console.log(`Redis error: ${e}`));

// client.on('reconnecting', (): void => console.log('Reconnecting redis ...'));

// client.on('end', (): void => console.log('Redis ended'));

// export const set = client.set;
// export const get = client.get;

// const pubClient = client;
// const subClient = pubClient.duplicate();

export { client };
// export { client, pubClient, subClient };
