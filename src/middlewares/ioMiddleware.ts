import axios from 'axios';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { env } from '../helpers/env-helper';

type SocketNextFunc = (err?: ExtendedError | undefined) => void;

const AUTH0_DOMAIN = env.string('AUTH0_DOMAIN', 'localhost');

export const ioMiddleware = async (socket: Socket, next: SocketNextFunc) => {
  const bearerToken = socket.request.headers.authorization;
  try {
    const { data } = await axios.get(`${AUTH0_DOMAIN}/userinfo`, {
      // @ts-ignore
      headers: { Authorization: bearerToken },
    });
    // @ts-ignore
    socket.request.user = data;
  } catch (error) {}

  next();
};
