const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: { origin: '*' }
});

// Middlewares
app.use(cors());
app.use(express.json());

// Base de datos
require('./database');

// Rutas
app.use('/api/tareas', require('./routes/tareaRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes')); 
// app.use('/api/roles', require('./routes/rolRoutes')); // más adelante

// WebSocket
require('./websockets/socketHandler')(io);

// Servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
