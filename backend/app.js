const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });
const path = require('path');

// Middlewares
app.use(cors());
app.use(express.json());

// Base de datos
require('./database');

// Rutas
app.use('/api/tareas', require('./routes/tareaRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/archivos', require('./routes/archivoRoutes'));
app.use('/api/etiquetas', require('./routes/etiquetaRoutes'));

// app.use('/api/roles', require('./routes/rolRoutes')); // si lo necesitas después

// ruta del front
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use('/views', express.static(path.join(__dirname, '../frontend/views')));

// WebSocket
require('./websockets/socketHandler')(io);

// Servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
