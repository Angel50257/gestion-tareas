const Etiqueta = require('../models/etiquetaModel');

exports.getEtiquetas = async (req, res) => {
    const etiquetas = await Etiqueta.getAll();
    res.json(etiquetas);
};

exports.getEtiqueta = async (req, res) => {
    const etiqueta = await Etiqueta.getById(req.params.id);
    if (!etiqueta) return res.status(404).json({ mensaje: 'Etiqueta no encontrada' });
    res.json(etiqueta);
};

exports.createEtiqueta = async (req, res) => {
    const { nombre } = req.body;
    const nueva = await Etiqueta.create(nombre);
    res.status(201).json(nueva);
};

exports.updateEtiqueta = async (req, res) => {
    const { nombre } = req.body;
    const actualizada = await Etiqueta.update(req.params.id, nombre);
    res.json(actualizada);
};

exports.deleteEtiqueta = async (req, res) => {
    await Etiqueta.delete(req.params.id);
    res.json({ mensaje: 'Etiqueta eliminada' });
};
