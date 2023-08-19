const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
let messageArray = [];

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//
io.on("connection", (socket) => {
  console.log("有一個使用者連線");

  //
  // 監聽來自客戶端的 "sent-message" 事件
  socket.on("sent-message", (value, callback) => {
    console.log('收到 "sent-message" 事件，值為：', value);

    // 儲存
    messageArray = [...messageArray, value];
    const result = { status: "success", message: "已建立某物！", data: messageArray };

    //發送給客戶端監聽"new-message" 事件
    socket.emit("new-message", result);

    // 回呼給客戶端，將建立結果傳回前端
    callback(result);
  });

  // socket.on("client-event", (data) => {
  //   console.log("收到来自客户端的事件：", data);

  //   // 服务器响应事件，向客户端发送数据
  //   const responseData = { message: "服务器已收到事件" };
  //   socket.emit("server-response", responseData);
  // });

  socket.on("disconnect", () => {
    console.log("使用者断线");
  });

  //
});

// ...其他设置和路由

server.listen(3001, () => {
  console.log("WebSocket server listening on port 3001");
});
