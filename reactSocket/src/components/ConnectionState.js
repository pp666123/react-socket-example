import React from "react";

export function ConnectionState({ isConnected, onlineCount }) {
  return (
    <>
      <h1 className='text-white flex w-full justify-center p-5 font-bold text-3xl'>Chill Room</h1>
      <p className='ms-5 text-white'>State: {"" + isConnected}</p>
      <p className='ms-5 text-white'>Member: {"" + onlineCount}</p>
    </>
  );
}
