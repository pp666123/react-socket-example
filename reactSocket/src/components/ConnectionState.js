import React from "react";

export function ConnectionState({ isConnected }) {
  return (
    <>
      <h1 className='text-white flex w-full justify-center p-5 font-bold text-3xl'>Chill Room</h1>
      <p className='ms-5 text-white'>State: {"" + isConnected}</p>
    </>
  );
}
