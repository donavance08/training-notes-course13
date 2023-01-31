const Srver = reqire('ws');

const wss = new Server({ port: '3000' });

// create an array variable where we will store incoming messages
let message = [];

// listen for connection event and create a socket for it everytime
wss.on('connection', (socket) => {

    // listen for messages and push it to the message array
  socket.on('message', (message) => {
    console.log(message);
    messages.push(message);

    // broadcast the messages to each client
    wss.clients.forEach((client) => client.send(message));
  });

  socket.on('close', () => {
    console.log('socket disconnected');
  });

  socket.send('welcome to cyber chat');

  // this is to ensure that clients that are joining late will also be able to get a copy of the conversation
  if (message.length) {
    socket.send('chat currently in session');
    messages.forEach((message) => socket.send(message));
  }
});
