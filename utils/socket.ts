import { io } from 'socket.io-client';

export const initSocket = (token: string) => {
  const socket = io('wss://c38a-178-120-215-67.ngrok-free.app', { auth: { token } });

  socket.on('connect', () => console.warn('connected'));
  socket.on('connect_error', (error: any) => {
    console.error(`Connection error for :`, error.description);
  });
  socket.on('notificate', data => {
    console.error('Received notification:', data);
  });
  socket.onAny((event, ...args) => {
    console.warn(`Received event: ${event}`, args);
  });

  return socket;
};
