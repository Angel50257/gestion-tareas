module.exports = function (io) {
    io.on('connection', socket => {
        console.log('✅ Usuario conectado:', socket.id);

        // 🔄 Eventos de tareas
        socket.on('nuevaTarea', tarea => {
            io.emit('tareaAgregada', tarea);
        });

        socket.on('tareaActualizada', tarea => {
            io.emit('tareaEditada', tarea);
        });

        socket.on('tareaEliminada', id => {
            io.emit('tareaBorrada', id);
        });

        // 🔄 Eventos de usuarios
        socket.on('nuevoUsuario', usuario => {
            io.emit('usuarioAgregado', usuario); // Crear
        });

        socket.on('usuarioActualizado', usuario => {
            io.emit('usuarioEditado', usuario); // Editar
        });

        socket.on('usuarioEliminado', id => {
            io.emit('usuarioBorrado', id); // Eliminar
        });

        socket.on('verUsuarios', () => {
            io.emit('listarUsuarios'); // Solo emite un trigger, espera que el frontend reaccione
        });

        // 🔌 Desconexión
        socket.on('disconnect', () => {
            console.log('🔌 Usuario desconectado:', socket.id);
        });
    });
};
