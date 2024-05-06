import { io } from "socket.io-client";

// const rtConnection = io('ws://localhost:5000');
// const rtConnection = io('ws://192.168.100.87:5000');
// const rtConnection = io('ws://192.168.0.1:5000');
// deploy home:
// const rtConnection = io('ws://192.168.56.1:5000')
// deploy render:
const rtConnection = io('https://makemeamillonarie-be.onrender.com:10000')

export { rtConnection }