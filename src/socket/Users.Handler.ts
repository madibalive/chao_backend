import { Socket, Server } from 'socket.io';
import { database } from '../database/db';
import { UsersEvent } from '../@types';

const UsersHandler = (io: Server, socket: Socket): void => {
  const fetchUsers = async () => {
    // @ts-ignore
    const currentUser = socket.request.user;
    const users = [];
    let blocked_by_user = await database('blocks').where('to', currentUser.email);
    let my_blocked_users = await database('blocks').where('from', currentUser.email);
    blocked_by_user = blocked_by_user.map((user) => user.from);
    my_blocked_users = my_blocked_users.map((user) => user.to);
    for (let [id, _socket] of io.of('/').sockets) {
      // @ts-ignore
      const user = _socket.request.user;
      if (currentUser.email === user.email) continue;
      user.isBlocked = blocked_by_user.includes(user.email);
      user.isBlockedByUser = my_blocked_users.includes(user.email);
      users.push(user);
    }
    io.in(currentUser.email).emit(UsersEvent.ACTIVE_USERS, users);
  };

  socket.on(UsersEvent.FETCH_USERS, fetchUsers);
};

export default UsersHandler;
