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
      const [id] = await database('blocks')
        .insert({
          to: blockedUser.email,
          from: currentUser.email,
        })
        .returning('*');
      // data = await database('blocks').where({ id });
      io.in(blockedUser.email).emit(UsersEvent.BLOCKED, { ...currentUser, isBlocked: true });
      io.in(currentUser.email).emit(UsersEvent.BLOCKED, {
        ...blockedUser,
        isBlockedByUser: true,
      });
    } catch (error) {}
  };

  const handleUnBlockUser = async (unBlockedUser: any, acknowlementFunc: Function) => {
    try {
      // @ts-ignore
      const currentUser = socket.request.user;

      let data = await database('blocks').where('to', unBlockedUser.email).orWhere('from', currentUser.email);

      if (data.length < 1) return;

      const removed = await database('blocks').where({ id: data[0].id }).del();

      io.in(currentUser.email).emit(UsersEvent.UN_BLOCKED, {
        ...unBlockedUser,
        isBlockedByUser: false,
      });

      io.in(unBlockedUser.email).emit(UsersEvent.UN_BLOCKED, { ...currentUser, isBlocked: false });
    } catch (error) {}
  };

  socket.on(UsersEvent.BLOCK_USER, handleBlockUser);
  socket.on(UsersEvent.UN_BLOCK_USER, handleUnBlockUser);
  //   socket.on(ChatEvent.STARTED_TYPING, startedTyping);
  //   socket.on(ChatEvent.FINISHED_TYPING, finishedTyping);
};

export default BlockHandler;
