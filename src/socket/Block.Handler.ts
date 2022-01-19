import { Socket, Server } from 'socket.io';
import { database } from '../database/db';
import { UsersEvent } from '../@types';

const BlockHandler = (io: Server, socket: Socket): void => {
  const handleBlockUser = async (blockedUser: any, acknowlementFunc: Function) => {
    try {
      // @ts-ignore
      const currentUser = socket.request.user;
      let data = await database('blocks').where('to', blockedUser.email).orWhere('from', currentUser.email);
      if (data.length > 0) return;
      const created = await database('blocks')
        .insert({
          to: blockedUser.email,
          from: currentUser.email,
        })
        .returning('*');
      io.in(blockedUser.email).emit(UsersEvent.BLOCKED, { ...currentUser, isBlocked: true });
      io.in(currentUser.email).emit(UsersEvent.BLOCKED, {
        ...blockedUser,
        isBlockedByUser: true,
      });
    } catch (error) {
      console.log('error -- ', error);
    }
  };

  const handleUnBlockUser = async (unBlockedUser: any, acknowlementFunc: Function) => {
    try {
      // @ts-ignore
      const currentUser = socket.request.user;
      let data = await database('blocks').where('to', unBlockedUser.email).orWhere('from', currentUser.email);
      if (data.length < 1) return;
      const deleteData = await database('blocks').where({ id: data[0] }).del();
      io.in(unBlockedUser.email).emit(UsersEvent.UN_BLOCKED, { ...currentUser, isBlocked: false });
      io.in(currentUser.email).emit(UsersEvent.UN_BLOCKED, {
        ...unBlockedUser,
        isBlockedByUser: false,
      });
    } catch (error) {}
  };

  const fetchUsers = async () => {
    // @ts-ignore
    const currentUser = socket.request.user;
    const users = [];
    let blocked_by_user = await database('blocks').select('to').where('to', currentUser.email);
    const my_blocked_users = await database('blocks').select('from').where('from', currentUser.email);
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

  socket.on(UsersEvent.BLOCK_USER, handleBlockUser);
  socket.on(UsersEvent.UN_BLOCK_USER, handleUnBlockUser);
  socket.on(UsersEvent.FETCH_USERS, fetchUsers);
};

export default BlockHandler;
