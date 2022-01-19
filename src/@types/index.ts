export enum ROLE {
  ADMINSTRATOR = 'ADMINSTRATOR',
  AUTHENTICATED = 'AUTHENTICATED',
  PUBLIC = 'PUBLIC',
}

export interface User {
  email: string;
}

export enum SocketEvent {
  DISCONNECTED = 'SOCKET:DISCONNECTED',
}

/* eslint-disable no-shadow */
export enum MessageEvent {
  MESSAGE = 'MESSAGE:MESSAGE',
  GET_ALL_MESSAGES = 'GET_ALL_MESSAGES',
  ACTIVE_USER_MESSAGES = 'MESSAGE:ACTIVE_USER_MESSAGES',
  STARTED_TYPING = 'MESSAGE:STARTED_TYPING',
  FINISHED_TYPING = 'MESSAGE:FINISHED_TYPING',
}

export enum UsersEvent {
  NEW_USER = 'USER:NEW_USER',
  FETCH_USERS = 'USER:FETCH_USERS',
  ACTIVE_USERS = 'USER:ACTIVE_USERS',
  BLOCK_USER = 'USER:BLOCK_USER',
  UN_BLOCK_USER = 'USER:UN_BLOCK_USER',
  BLOCKED = 'USER:BLOCKED',
  UN_BLOCKED = 'USER:UN_BLOCKED',
}

export enum NotificationsEvent {
  NOTIFICATION = 'notifications:notification',
}

export type EmailOptions = Omit<any, 'from'>;
