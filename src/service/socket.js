import { io } from "socket.io-client";

// const rtConnection = io('ws://localhost:3000');
// const rtConnection = io('ws://192.168.100.87:3000');
// const rtConnection = io('ws://192.168.0.1:3000');
// deploy home:
// const rtConnection = io('ws://192.168.56.1:3000')
// deploy render:
const rtConnection = io('https://makemeamillonarie-be.onrender.com')

export { rtConnection }