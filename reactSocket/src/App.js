import React, { useState, useEffect, useLayoutEffect } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import { MyForm } from "./components/MyForm";
import { Events } from "./components/Events";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onNewMessageEvent(value) {
      console.log("收到new-message事件消息");
      setFooEvents(value.data);
    }

    function onOnlineCountEvent(value) {
      console.log("在線人數:" + value);
      setOnlineCount(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("new-message", onNewMessageEvent);
    socket.on("online-count", onOnlineCountEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("new-message", onNewMessageEvent);
    };
  }, []);

  useEffect(() => {
    console.log("傳送使用者名稱");
    socket.emit("connect-count", "monnkkey");
    return () => {
      socket.off("connect-count");
    };
  }, []);

  return (
    <div className='App bg-black pb-5 flex flex-col justify-center min-h-screen'>
      <ConnectionState
        isConnected={isConnected}
        onlineCount={onlineCount}
      />
      <Events events={fooEvents} />
      <div className='w-full p-5 flex md:justify-between'>
        <div className='w-2/5'>
          <ConnectionManager />
        </div>
        <div className='flex w-3/5'>
          <MyForm />
        </div>
      </div>
    </div>
  );
}
