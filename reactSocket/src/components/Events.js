import React from "react";

export function Events({ events }) {
  return (
    <div className='border-2 border-white rounded-md m-5 text-white h-50-vh overflow-auto'>
      {events.map((event, index) => (
        <div
          className='p-2 ps-6'
          key={index}
        >
          user ： {event}
        </div>
      ))}
    </div>
  );
}
