import React, { useState, useEffect, useRef } from "react";
import { rtConnection } from "../service/socket";
import { useAuth0 } from "@auth0/auth0-react";

function Chat() {
  const { user, isAuthenticated} = useAuth0();
  const [isConnected, setIsConnected] = useState(false);
  const [newMessaje, setNewMessaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const chatboxRef = useRef(null);

  const sendMessaje = () => {
    rtConnection.emit("chat_message", {
      usuario: user.name || rtConnection.id,
      mensaje: newMessaje,
    });
    setNewMessaje("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessaje();
    }
  };
  const messageLogin = () => {
    return alert("Pleace! Log In!");
  }
  //-> scroll down every time messages are updated:
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [mensajes]);
  //-> send data to BE:
  useEffect(() => {
    rtConnection.on("connect", () => setIsConnected(true));
    rtConnection.on("chat_message", (data) => {
      setMensajes((mensajes) => [...mensajes, data]);
    });
    return () => {
      rtConnection.off("connect");
      rtConnection.off("chat_message");
    };
  }, []);

  return (
    <div id="chat-container">
      <div class="bg-white shadow-md rounded-lg max-w-lg w-full">
        <div class="p-4 border-b bg-fuchsia-900 text-white rounded-t-lg flex justify-between items-center">
          <p class="text-lg font-semibold">
            {isConnected ? "ONLINE:" : "OFFLINE:"}
          </p>
        </div>

        <div ref={chatboxRef} class="p-4 h-64 overflow-y-auto">
          {mensajes.map((mensaje, index) => (
            <div key={index} class="mb-2 text-right">
              <p class="bg-fuchsia-900 text-white rounded-lg py-2 px-4 inline-block">
                {mensaje.usuario}: {mensaje.mensaje}
              </p>
            </div>
          ))}
        </div>

        <div class="p-4 border-t flex">
          <input
            id="user-input"
            type="text"
            placeholder="Type a message"
            class="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setNewMessaje(e.target.value)}
            value={newMessaje}
            onKeyPress={handleKeyPress}
          />
          <button
            id="send-button"
            class="bg-fuchsia-900 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
            onClick={isAuthenticated ? sendMessaje : messageLogin}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
