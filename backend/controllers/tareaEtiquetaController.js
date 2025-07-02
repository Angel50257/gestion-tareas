const Modelo = require('../models/tareaEtiquetaModel');

exports.listar = async (req, res) => {
  const relaciones = await Modelo.obtenerTodas();
  res.json(relaciones);
};

exports.listarPorTarea = async (req, res) => {
  const relaciones = await Modelo.obtenerPorTarea(req.params.tarea_id);
  res.json(relaciones);
};

exports.agregar = async (req, res) => {
  const { tarea_id, etiqueta_id } = req.body;
  await Modelo.agregar(tarea_id, etiqueta_id);
  res.status(201).json({ mensaje: 'Relación agregada' });
};

exports.eliminar = async (req, res) => {
  const { tarea_id, etiqueta_id } = req.body;
  await Modelo.eliminar(tarea_id, etiqueta_id);
  res.json({ mensaje: 'Relación eliminada' });
};

exports.editar = async (req, res) => {
  const { tarea_id, etiqueta_id, nueva_etiqueta_id } = req.body;
  await Modelo.editar(tarea_id, etiqueta_id, nueva_etiqueta_id);
  res.json({ mensaje: 'Relación actualizada' });
};
