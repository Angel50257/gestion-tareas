const Tarea = require('../models/tareaModel');

const tareaController = {
    async listar(req, res) {
        const tareas = await Tarea.obtenerTodas();
        res.json(tareas);
    },

    async obtener(req, res) {
        const tarea = await Tarea.obtenerPorId(req.params.id);
        if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        res.json(tarea);
    },

    async crear(req, res) {
        const id = await Tarea.crear(req.body);
        res.status(201).json({ mensaje: 'Tarea creada', id });
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
