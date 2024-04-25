import { useState, useEffect } from 'react';
import { rtConnection } from "../service/socket";
// import { LiMensaje, UlMensajes } from './ui-components';

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
    <div className="App">
      <h2>{isConnected ? 'ONLINE:' : 'OFFLINE:'}</h2>
      {/* <UlMensajes> */}
        {mensajes.map(mensaje => (
          // <LiMensaje>
          <div>
            {mensaje.usuario}: {mensaje.mensaje}
          </div>
            // </LiMensaje>
        ))}
      {/* </UlMensajes> */}
      <input
        type="text"
        onChange={e => setNuevoMensaje(e.target.value)}
      />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
}

export default Chat;

