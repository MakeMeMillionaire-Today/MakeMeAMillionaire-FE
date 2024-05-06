import { io } from "socket.io-client";

// const rtConnection = io('ws://localhost:8080');
// const rtConnection = io('ws://192.168.100.87:8080');
// const rtConnection = io('ws://192.168.0.1:8080');
// deploy home:
// const rtConnection = io('ws://192.168.56.1:8080')
// deploy render:
const rtConnection = io('https://makemeamillonarie-be.onrender.com')

export { rtConnection }