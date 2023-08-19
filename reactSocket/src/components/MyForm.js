import React, { useState } from "react";
import { socket } from "../socket";

export function MyForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.emit("sent-message", value, () => {
      setIsLoading(false);
    });
  }

  return (
    <form
      className='ms-3'
      onSubmit={onSubmit}
    >
      <input
        className='me-3 border-2 border-white rounded-md p-1 w-96'
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        className='text-white border-2 border-white rounded-md p-1'
        type='submit'
        disabled={isLoading}
      >
        Submit
      </button>
    </form>
  );
}
