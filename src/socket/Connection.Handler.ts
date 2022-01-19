import { Socket, Server } from 'socket.io';
import { SocketEvent, UsersEvent } from '../@types';
import { database } from '../database/db';

const ConnectionHandler = async (io: Server, socket: Socket) => {
  try {
    // @ts-ignore
    const currentUser = socket.request.user;
    console.log('new user connected -- ', currentUser.email);
    socket.broadcast.emit(UsersEvent.NEW_USER, currentUser);

    socket.join(currentUser.email);

    const users = [];
    let blocked_by_user: any[] = [];
    let my_blocked_users: any[] = [];

    blocked_by_user = await database('blocks').select('to').where('to', currentUser.email);
    my_blocked_users = await database('blocks').select('from').where('from', currentUser.email);
    for (let [id, _socket] of io.of('/').sockets) {
      // @ts-ignore
      const user = _socket.request.user;
      if (currentUser.email === user.email) continue;
      user.isBlocked = blocked_by_user.includes(user.email);
      user.isBlockedByUser = my_blocked_users.includes(user.email);
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
  } catch (error) {
    console.log(error);
  }
};

export default ConnectionHandler;
