import { Socket, Server } from 'socket.io';
import { database } from '../database/db';
import { UsersEvent } from '../@types';

const BlockHandler = (io: Server, socket: Socket): void => {
  const handleBlockUser = async (blockedUser: any, acknowlementFunc: Function) => {
    try {
      // @ts-ignore
      const currentUser = socket.request.user;
      let data = await database('blocks').where('to', blockedUser.email).orWhere('from', currentUser.email);
      if (data.length < 1) {
        const created = await database('blocks')
          .insert({
            from: currentUser.email,
            to: blockedUser.email,
          })
          .returning('*');
      }
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
      const deleteData = await database('blocks').where({ id: data[0].id }).del();
      io.in(unBlockedUser.email).emit(UsersEvent.UN_BLOCKED, { ...currentUser, isBlocked: false });
      io.in(currentUser.email).emit(UsersEvent.UN_BLOCKED, {
        ...unBlockedUser,
        isBlockedByUser: false,
      });
    } catch (error) {}
  };

  socket.on(UsersEvent.BLOCK_USER, handleBlockUser);
  socket.on(UsersEvent.UN_BLOCK_USER, handleUnBlockUser);
};

export default BlockHandler;
