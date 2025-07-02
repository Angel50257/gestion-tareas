const Tarea = require('../models/tareaModel');

const tareaController = {
            async listar(req, res) {
        try {
            const tareas = await Tarea.obtenerTodas();
            res.json(tareas);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
        },

// listar tareas por usuario por token
        async listarPorUsuario(req, res) {
    try {
        const usuarioId = req.usuario.id; // obtenido del token JWT
        const tareas = await Tarea.obtenerPorUsuario(usuarioId);
        res.json(tareas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
},


    async obtener(req, res) {
        const tarea = await Tarea.obtenerPorId(req.params.id);
        if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        res.json(tarea);
    },

    /* async crear(req, res) {
        const id = await Tarea.crear(req.body);
        res.status(201).json({ mensaje: 'Tarea creada', id });
    }, */

            async crear(req, res) {
        try {
            const tarea = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            estado: req.body.estado,
            usuario_id: req.usuario.id 
            };
            const id = await Tarea.crear(tarea);
            res.status(201).json({ mensaje: 'Tarea creada', id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
        },

    async actualizar(req, res) {
        await Tarea.actualizar(req.params.id, req.body);
        res.json({ mensaje: 'Tarea actualizada' });
    },

    async eliminar(req, res) {
        await Tarea.eliminar(req.params.id);
        res.json({ mensaje: 'Tarea eliminada' });
    }
};

module.exports = tareaController;
