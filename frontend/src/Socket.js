import socketIOClient from 'socket.io-client';

const socket = new socketIOClient('localhost:4000');

export default socket;
