import { io } from "socket.io-client";

//-> access point by socket.io: 
// const rtConnection = io('ws://localhost:3000');
// const rtConnection = io('ws://192.168.100.87:3000');
// const rtConnection = io('ws://192.168.0.1:3000');
// deploy my red-home:
// const rtConnection = io('ws://192.168.56.1:3000')
// old deploy render:
// const rtConnection = io('https://makemeamillonarie-be.onrender.com')
// new render deploy:
const rtConnection = io('https://makemeamillionaire-be.onrender.com')

export { rtConnection }