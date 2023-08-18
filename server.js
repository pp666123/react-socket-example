const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // 引入 cors 模块

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // 允许的前端域
    methods: ["GET", "POST"],
  },
});

//
io.on("connection", (socket) => {
  console.log("有一個使用者連線");

  // 監聽來自客戶端的 "create-something" 事件
  socket.on("create-something", (value, callback) => {
    // 執行相應的邏輯，例如建立某些東西，然後回呼給客戶端
    // 這只是一個示例，你需要根據你的業務邏輯進行處理
    console.log('收到 "create-something" 事件，值為：', value);

    // 執行建立操作，這裡假設成功建立
    const result = { status: "success", message: "已建立某物！" };

    // 回呼給客戶端，將建立結果傳回前端
    callback(result);
  });

  socket.on("disconnect", () => {
    console.log("使用者斷線");
  });
});

// ...其他设置和路由

server.listen(3001, () => {
  console.log("WebSocket server listening on port 3001");
});
