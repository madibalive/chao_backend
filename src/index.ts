import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});
import { createAdapter } from '@socket.io/redis-adapter';
import { Server, Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';

import { env } from './helpers/env-helper';

import { app } from './app';
import { logger } from './helpers/logger';
// import { pubClient, subClient } from './helpers/cache';
import { ioMiddleware } from './middlewares/ioMiddleware';
import ConnectionHandler from './socket/Connection.Handler';
import chatHandler from './socket/Chat.Handler';
import BlockHandler from './socket/Block.Handler';

type SocketNextFunc = (err?: ExtendedError | undefined) => void;

const HOST = env.string('SERVER_HOST', 'localhost');
// const PORT = env.number('SERVER_PORT', 5000);
const PORT = process.env.PORT || 4000;
// @ts-ignore
const server = app.listen(PORT, () => {
  logger.info(`🚀 Server is up and running at http://${HOST}:${PORT}`);
});

const io = new Server(server, {
  // adapter: createAdapter(pubClient, subClient),
  cors: {
    origin: '*',
  },
});

io.use(ioMiddleware);

io.on('connection', async function (socket) {
  await ConnectionHandler(io, socket);
  chatHandler(io, socket);
  BlockHandler(io, socket);
});
