import { Socket, Server } from 'socket.io';
import { MessageEvent, User } from '../@types';
import { database } from '../database/db';

const chatHandler = (io: Server, socket: Socket): void => {
  const onCreateChat = async (message: any, acknowlementFunc: Function) => {
    try {
      const blockedByRecipientOrSender = await database('blocks')
        .where('from', message.to)
        .orWhere('from', message.from);

      if (blockedByRecipientOrSender.length > 1) return;

      let data = await database('messages').insert(message).returning('*');
      // data = await database('messages').where({ id: data[0].id });
      // disable for postgress
      if (data.length > 0) {
        socket.to(message.to).emit(MessageEvent.MESSAGE, data[0]);
        socket.broadcast.to(message.from).emit(MessageEvent.MESSAGE, data[0]);
        acknowlementFunc({ delivered: true });
      }
    } catch (error) {
      console.log('error -- ', error);
    }
  };

  const onFetchMessages = async (activeUser: User) => {
    try {
      // @ts-ignore
      const currentUser = socket.request.user;
      const users = [currentUser.email, activeUser.email];
      const messages = await database('messages').whereIn('from', users).orWhere('to', activeUser.email);
      io.in(currentUser.email).emit(MessageEvent.ACTIVE_USER_MESSAGES, messages);
    } catch (error) {}
  };

  //   const startedTyping = (roomId: ID) => {
  //     socket.to(roomId).emit(ChatEvent.STARTED_TYPING, socket.user);
  //   };

  //   const finishedTyping = (roomId: ID) => {
  //     socket.to(roomId).emit(ChatEvent.FINISHED_TYPING, socket.user);
  //   };

  socket.on(MessageEvent.MESSAGE, onCreateChat);
  socket.on(MessageEvent.ACTIVE_USER_MESSAGES, onFetchMessages);
  //   socket.on(ChatEvent.STARTED_TYPING, startedTyping);
  //   socket.on(ChatEvent.FINISHED_TYPING, finishedTyping);
};

export default chatHandler;
