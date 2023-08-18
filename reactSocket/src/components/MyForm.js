import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import { io } from "socket.io-client";

export function MyForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageArray, setMessageArray] = useState([]);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.emit("create-something", value, (result) => {
      console.log("Sending create-something event...");
      console.log(result);
      setMessageArray(result.data);
      setIsLoading(false);
    });
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={(e) => setValue(e.target.value)} />

        <button
          type='submit'
          disabled={isLoading}
        >
          Submit
        </button>
      </form>
      <div>
        Message:
        <br />
        {messageArray.map((array) => {
          return <div>{array}</div>;
        })}
      </div>
    </>
  );
}
