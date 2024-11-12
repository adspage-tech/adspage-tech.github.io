const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  socket.on('mensaje', (msg) => {
    console.log('Mensaje recibido: ' + msg);
    io.emit('mensaje', msg); // Reenvía el mensaje a todos los clientes
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
