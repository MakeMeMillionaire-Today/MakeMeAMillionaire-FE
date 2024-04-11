import { io } from "socket.io-client";

const rtConnection = io('ws://localhost:5000');

export { rtConnection }