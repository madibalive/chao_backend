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
import { pubClient, subClient } from './helpers/cache';
import { ioMiddleware } from './middlewares/ioMiddleware';
import ConnectionHandler from './socket/Connection.Handler';
import chatHandler from './socket/Chat.Handler';
import BlockHandler from './socket/Block.Handler';
import { getAuthenticatedUserDetails } from './middlewares/get-authenticated-user-info copy';
type SocketNextFunc = (err?: ExtendedError | undefined) => void;

const PORT = process.env.PORT || 4000;

const server = app.listen(process.env.PORT, () => {
  logger.info(`🚀 Server is up and running at http://${PORT}`);
});

const io = new Server(server, {
  adapter: createAdapter(pubClient, subClient),
  cors: {
    origin: '*',
  },
});

// io.use(ioMiddleware);

const adaptSocketToExpressMiddleWares = (middleware: Function) => (socket: Socket, next: SocketNextFunc) =>
  middleware(socket.request, {}, next);

io.use(adaptSocketToExpressMiddleWares(getAuthenticatedUserDetails));

io.on('connection', async function (socket) {
  try {
    await ConnectionHandler(io, socket);
    chatHandler(io, socket);
    BlockHandler(io, socket);
  } catch (error) {
    console.log(error);
  }
});
