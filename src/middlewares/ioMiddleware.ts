import axios from 'axios';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { env } from '../helpers/env-helper';
import { logger } from '../helpers/logger';

type SocketNextFunc = (err?: ExtendedError | undefined) => void;

export const ioMiddleware = async (socket: Socket, next: SocketNextFunc) => {
  const bearerToken = socket.request.headers.authorization;
  // try {
  const response = await axios.get(`https://dev-tgdlv40g.us.auth0.com/userinfo`, {
    // @ts-ignore
    headers: { Authorization: bearerToken },
  });
  // @ts-ignore
  socket.request.user = response.data;
  next();
  // logger.info(data);
  // } catch (error) {
  //   logger.error(error.message);
  // }
};
