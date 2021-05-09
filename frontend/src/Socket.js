import socketIOClient from 'socket.io-client';

const socket = new socketIOClient('https://octotube-backend.herokuapp.com/');

export default socket;
