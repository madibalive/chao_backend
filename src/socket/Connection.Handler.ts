import { Socket, Server } from 'socket.io';
import { SocketEvent, UsersEvent } from '../@types';
import { database } from '../database/db';

const ConnectionHandler = async (io: Server, socket: Socket) => {
  // @ts-ignore
  const currentUser = socket.request.user;
  console.log('new user connected -- ', currentUser.email);
  socket.broadcast.emit(UsersEvent.NEW_USER, currentUser);

  socket.join(currentUser.email);

  const users = [];
  let blockFromList: any[] = [];
  let currenUserBlocks: any[] = [];

  try {
    blockFromList = await database('blocks').where('to', currentUser.email);
    currenUserBlocks = await database('blocks').where('from', currentUser.email);
  } catch (error) {}
  blockFromList = blockFromList.map((each) => each.from);
  currenUserBlocks = currenUserBlocks.map((each) => each.to);

  for (let [id, _socket] of io.of('/').sockets) {
    // @ts-ignore
    const user = _socket.request.user;
    if (currentUser.email === user.email) continue;
    user.isBlocked = blockFromList.includes(user.email);
    user.isBlockedByUser = currenUserBlocks.includes(user.email);

    users.push(user);
  }
  console.log('active users -- ');
  console.log(users);
  console.log('active users -- ');

  socket.emit(UsersEvent.ACTIVE_USERS, users);

  const disconnect = async () => {
    // @ts-ignore
    const currentUser = socket.request.user;
    console.log('disconnecting ', currentUser.email);

    const matchingSockets = await io.in(currentUser.email).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) socket.broadcast.emit(SocketEvent.DISCONNECTED, currentUser);
  };

  socket.on('disconnect', disconnect);
};

export default ConnectionHandler;
