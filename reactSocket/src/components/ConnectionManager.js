import React from "react";
import { socket } from "../socket";

export function ConnectionManager() {
  function connect() {
    socket.connect();
    console.log(socket);
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </>
  );
}
