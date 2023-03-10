const { createServer } = require('http');
const socketIO = require('socket.io');

const server = createServer().listen(3000);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log(`${io.engine.clientsCount} connections`);

  // this is a custom event created for listening to chat events
  socket.on('chat', (message) => {
    console.log(`${socket.id}: ${message}`);
    // broadcast the messages that were sent
    io.sockets.emit('chat-message', message, socket.id);
  });
  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

console.log('Socket Server');

