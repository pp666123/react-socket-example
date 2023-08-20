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
        className='text-white border-2 border-white rounded-md p-1 me-3 hover:bg-white hover:text-black'
        onClick={connect}
      >
        Connect
      </button>
      <button
        className='text-white border-2 border-white rounded-md p-1 hover:bg-white hover:text-black'
        onClick={disconnect}
      >
        Disconnect
      </button>
    </>
  );
}
