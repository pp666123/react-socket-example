const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let messageArray = [];
let onlineMember = [];

io.on("connection", (socket) => {
  console.log("有一個使用者連線");
  // ****************************************
  // ****************************************
  // 訊息傳遞
  // 監聽來自客戶端的 "sent-message" 事件
  socket.on("sent-message", (obj, callback) => {
    console.log('收到 "sent-message" 事件，值為：', obj);

    // 儲存message
    messageArray = [...messageArray, `${obj.username}: ${obj.message}`];
    const result = { status: "success", message: "已新增訊息！", data: messageArray };

    // 發送給emit客戶端監聽"new-message" 事件
    socket.emit("new-message", result);

    // 發送給"除"emit以外"所有"客戶端監聽"new-message" 事件
    socket.broadcast.emit("new-message", result);

    // 回呼給客戶端，將建立結果傳回前端
    callback(result);
  });
  // ****************************************
  // ****************************************

  // ****************************************
  // ****************************************
  // 統計在線人數
  // 上線
  socket.on("connect-count", (value, callback) => {
    console.log('收到 "connect-count" 事件，值為：', value);
    console.log(onlineMember.includes(value));

    // 統計人數 && 暱稱設定
    if (!onlineMember.includes(value)) {
      onlineMember = [...onlineMember, value];
      const result = { success: true, message: "已建立username！", data: onlineMember.length, username: value };
      // 傳送至user端
      socket.emit("online-count", result);
      socket.broadcast.emit("online-count", result);
      callback(result);
      // 傳送訊息
      const messageResult = { status: "success", message: "已新增訊息！", data: messageArray };
      socket.emit("new-message", messageResult);
    } else {
      const result = { success: false, message: "username重複，建立失敗！", data: false, username: false };
      // 傳送至user端
      callback(result);
    }
    console.log(onlineMember);
  });
  // 下線
  socket.on("disconnect", () => {
    console.log("使用者斷線");
    onlineMember = onlineMember.slice(1);
    socket.emit("online-count", onlineMember.length);
    socket.broadcast.emit("online-count", onlineMember.length || "0");
    console.log(onlineMember);
    console.log(onlineMember.length);
  });
  // ****************************************
  // ****************************************

  // ****************************************
  // ****************************************
  // user name
  // 檢查是否重複
  // =>是，回傳unsuccess
  // =>否，新增{id:1, name:xxx}回傳success & 之前所有訊息

  // ****************************************
  // ****************************************
});

// ...其他设置和路由
server.listen(3001, () => {
  console.log("WebSocket server listening on port 3001");
});
