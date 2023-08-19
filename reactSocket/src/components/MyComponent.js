import React, { useEffect, useState } from "react";
import { socket } from "../socket";

// export default function MyComponent() {
//   const [fooEvents, setFooEvents] = useState([]);

//   useEffect(() => {
//     function onFooEvent(value) {
//       setFooEvents((previous) => [...previous, value]);
//     }

//     // BAD: this ties the state of the UI with the time of reception of the
//     // 'foo' events
//     socket.on("foo", onFooEvent);

//     return () => {
//       socket.off("foo", onFooEvent);
//     };
//   }, []);

//   // ...
//   return <div>,,,,</div>;
// }

const MyComponent = () => {
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    // BAD: this ties the state of the UI with the time of reception of the
    // 'foo' events
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("foo", onFooEvent);
    };
  }, []);

  return <div>{fooEvents}</div>;
};

export default MyComponent;
