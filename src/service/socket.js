import { io } from "socket.io-client";

const rtConnection = io('ws://localhost:5000');
// const rtConnection = io('ws://192.168.100.87:5000');

export { rtConnection }