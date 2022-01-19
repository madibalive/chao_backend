import axios from 'axios';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';

type SocketNextFunc = (err?: ExtendedError | undefined) => void;

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || 'https://dev-tgdlv40g.us.auth0.com';

export const ioMiddleware = async (socket: Socket, next: SocketNextFunc) => {
  const bearerToken = socket.request.headers.authorization;
  const response = await axios.get(`${AUTH0_DOMAIN}/userinfo`, {
    // @ts-ignore
    headers: { Authorization: bearerToken },
  });
  // @ts-ignore
  socket.request.user = response.data;
  next();
};
