import React, { useState } from "react";
import { socket } from "../socket";

export function MyForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(false);
  const [enterRoom, setEnterRoom] = useState(false);

  function onSubmit(event) {
    setValue("");
    event.preventDefault();
    setIsLoading(true);

    socket.emit("sent-message", { username: username, message: value }, () => {
      setIsLoading(false);
    });
  }

  function usernameSubmit(event) {
    event.preventDefault();

    // 送訊息到後端
    socket.emit("connect-count", username, (result) => {
      console.log(result);
      result.success && setEnterRoom(true);
      result.success && setUsername(result.username);
    });
    // reset
    setUsername("");
  }

  return (
    <>
      {enterRoom && (
        <form
          className='ms-3 w-full flex justify-end'
          onSubmit={onSubmit}
        >
          <input
            className='pe-3 border-2 border-white rounded-md p-1 w-3/4 me-3'
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />

          <button
            className='text-white border-2 border-white rounded-md p-1 w-1/3 md:w-1/5 hover:bg-white hover:text-black'
            type='submit'
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
      )}
      {!enterRoom && (
        <form
          className='ms-3 w-full flex justify-end'
          onSubmit={usernameSubmit}
        >
          <input
            className='pe-3 border-2 border-white rounded-md p-1 w-3/4 me-3'
            onChange={(e) => setUsername(e.target.value)}
          />

          <button
            className='text-white border-2 border-white rounded-md p-1 w-1/3 md:w-1/5 hover:bg-white hover:text-black'
            disabled={isLoading}
            type='submit'
          >
            SetUsername
          </button>
        </form>
      )}
    </>
  );
}
