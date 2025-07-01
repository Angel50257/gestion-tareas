// backend/controllers/usuarioController.js
const Usuario = require('../models/usuarioModel');

module.exports = {
  async listar(req, res) {
    try {
      const usuarios = await Usuario.obtenerTodos();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async obtener(req, res) {
    try {
      const usuario = await Usuario.obtenerPorId(req.params.id);
      if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async crear(req, res) {
    try {
      const id = await Usuario.crear(req.body);
      res.status(201).json({ mensaje: 'Usuario creado', id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async actualizar(req, res) {
    try {
      await Usuario.actualizar(req.params.id, req.body);
      res.json({ mensaje: 'Usuario actualizado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async eliminar(req, res) {
    try {
      await Usuario.eliminar(req.params.id);
      res.json({ mensaje: 'Usuario eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
