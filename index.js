const { log } = require('console');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected',socket.id);

  socket.emit('SEVER_SEND_SOCKET_ID', socket.id);


  socket.on("CLINET_SEND_MESS", (data) => {

    // khi A gửi data lên server, server chỉ trả về cho A
    // socket.emit('SEVER_RETURN_MESS', data);

    // khi A gửi data lên server, server  trả về cho A, B, C, ....
    io.emit('SEVER_RETURN_MESS', data);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});