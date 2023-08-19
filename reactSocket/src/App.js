import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import { MyForm } from "./components/MyForm";
import { Events } from "./components/Events";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      console.log("收到new-message事件消息");
      setFooEvents(value.data);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("new-message", onFooEvent);

    return () => {
      // socket.off("connect", onConnect);
      // socket.off("disconnect", onDisconnect);
      // socket.off("new-message", onFooEvent);
    };
  }, []);

  return (
    <div className='App bg-black pb-5 flex flex-col justify-center min-h-screen'>
      <ConnectionState isConnected={isConnected} />
      <Events events={fooEvents} />
      <div className='m-5 flex'>
        <ConnectionManager />
        <div className='flex w-full justify-end'>
          <MyForm />
        </div>
      </div>
    </div>
  );
}
