import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});
import { createAdapter } from '@socket.io/redis-adapter';
import { Server } from 'socket.io';

import { env } from './helpers/env-helper';

import { app } from './app';
import { logger } from './helpers/logger';
import { pubClient, subClient } from './helpers/cache';
import { ioMiddleware } from './middlewares/ioMiddleware';
import ConnectionHandler from './socket/Connection.Handler';
import chatHandler from './socket/Chat.Handler';
import BlockHandler from './socket/Block.Handler';

const HOST = env.string('SERVER_HOST', 'localhost');
const PORT = env.number('SERVER_PORT', 4000);

const server = app.listen(PORT, HOST, () => {
  logger.info(`🚀 Server is up and running at http://${HOST}:${PORT}`);
});

const io = new Server(server, {
  adapter: createAdapter(pubClient, subClient),
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
