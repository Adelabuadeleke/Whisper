require('dotenv').config();
const validator = require('validator').default;
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: { origin: '*' },
  reconnectionAttempts: 5,
});
const sockets = require('./sockets');
const {mongoConnect} = require('./services/mongo')
const userRoutes = require('./routes/userRoutes')

const HTTP_PORT = process.env.PORT || 4000;

// Modules
const {
  init
} = require('./lib');

app.use(express.json());
app.use(cors());

// Routes
app.use('/user', userRoutes);

/**
 * this function will be triggred when ever the user from front-end will search
 * for new user to chat.
 *
 * @param {Server} io
 */

// Sockets
sockets.listen(io)

// Cors
app.use(cors());

async function startServer() {
  await mongoConnect()

  server.listen(HTTP_PORT, async () => {
    await init();
    console.log(`on port ${HTTP_PORT}`);
  });
}

startServer();