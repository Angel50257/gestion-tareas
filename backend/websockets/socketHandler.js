module.exports = function (io) {
    io.on('connection', socket => {
        console.log('Usuario conectado:', socket.id);

        // Tareas
        socket.on('nuevaTarea', tarea => io.emit('tareaAgregada', tarea));
        socket.on('tareaActualizada', tarea => io.emit('tareaEditada', tarea));
        socket.on('tareaEliminada', id => io.emit('tareaBorrada', id));

        // Usuarios
        socket.on('nuevoUsuario', usuario => io.emit('usuarioAgregado', usuario));
        socket.on('usuarioActualizado', usuario => io.emit('usuarioEditado', usuario));
        socket.on('usuarioEliminado', id => io.emit('usuarioBorrado', id));
        socket.on('verUsuarios', () => io.emit('listarUsuarios'));

        // Archivos
        socket.on('verArchivos', () => io.emit('listarArchivos'));
        socket.on('nuevoArchivo', archivo => io.emit('archivoAgregado', archivo));
        socket.on('archivoActualizado', archivo => io.emit('archivoEditado', archivo));
        socket.on('archivoEliminado', id => io.emit('archivoBorrado', id));

        // Etiquetas
        socket.on('verEtiquetas', () => io.emit('listarEtiquetas'));
        socket.on('nuevaEtiqueta', etiqueta => io.emit('etiquetaAgregada', etiqueta));
        socket.on('etiquetaActualizada', etiqueta => io.emit('etiquetaEditada', etiqueta));
        socket.on('etiquetaEliminada', id => io.emit('etiquetaBorrada', id));

        // Desconexión
        socket.on('disconnect', () => {
            console.log('🔌 Usuario desconectado:', socket.id);
        });
    });
};
