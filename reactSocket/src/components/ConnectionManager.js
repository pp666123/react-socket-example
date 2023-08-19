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
      <button
        className='text-white border-2 border-white rounded-md p-1 me-3'
        onClick={connect}
      >
        Connect
      </button>
      <button
        className='text-white border-2 border-white rounded-md p-1'
        onClick={disconnect}
      >
        Disconnect
      </button>
    </>
  );
}
