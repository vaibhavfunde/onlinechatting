// server.js
const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const { userjoin, getcurrentuser } = require('.users');
const formatmessage = require('.messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

const botname = 'chatCord bot';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userjoin(socket.id, username, room);
    socket.join(user.room);
    socket.emit('message', formatmessage(botname, "Welcome to ChartCord"));

    // Broadcast when a user connects
    socket.broadcast.to(user.room).emit('message', formatmessage(botname, `${user.username} has joined the chat`));
  });

  // Listen for chat message
  socket.on('chatmessage', msg => {
    const user = getcurrentuser(socket.id);
    if (user) {
      io.to(user.room).emit('message', formatmessage(user.username, msg));
    }
  });

  // Run when client disconnects
  socket.on('disconnect', () => {
    const user = getcurrentuser(socket.id);
    if (user) {
      io.to(user.room).emit('message', formatmessage(botname, `${user.username} has left the chat`));
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
