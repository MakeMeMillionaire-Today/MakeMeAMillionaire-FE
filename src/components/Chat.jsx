import { useState, useEffect } from 'react';
import { rtConnection } from "../service/socket";

function Chat() {
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    rtConnection.on('connect', () => setIsConnected(true));
    rtConnection.on('chat_message', (data) => {
      setMensajes(mensajes => [...mensajes, data]);
    });
    return () => {
      rtConnection.off('connect');
      rtConnection.off('chat_message');
    }
  }, []);

  const enviarMensaje = () => {
    rtConnection.emit('chat_message', {
      usuario: rtConnection.id,
      mensaje: nuevoMensaje
    });
  }

  return (
    <div id="chat-container">
        <div class="bg-white shadow-md rounded-lg max-w-lg w-full">
            <div class="p-4 border-b bg-fuchsia-900 text-white rounded-t-lg flex justify-between items-center">
                <p class="text-lg font-semibold">{isConnected ? 'ONLINE:' : 'OFFLINE:'}</p>
                {/* <button id="close-chat" class="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button> */}
            </div>

            <div id="chatbox" class="p-4 h-64 overflow-y-auto">
              {mensajes.map(mensaje => (
                <div class="mb-2 text-right">
                  <p class="bg-fuchsia-900 text-white rounded-lg py-2 px-4 inline-block">{mensaje.usuario}: {mensaje.mensaje}</p>
                </div>
              ))}
            </div>

            <div class="p-4 border-t flex">
                <input id="user-input"  type="text" placeholder="Type a message" class="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setNuevoMensaje(e.target.value)} />
                <button id="send-button" class="bg-fuchsia-900 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300" onClick={enviarMensaje}>Send</button>
            </div>
        </div>
    </div>
  );
}

export default Chat;

