import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = 3000;

// Servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// API routes
app.get('/game/start', (req, res) => {
  res.json({ status: 'send initial game state' });
});

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Catch-all: renvoyer index.html en cas de route indisponible pour éviter de casser le SPA
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

server.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
