const ArchivoModel = require('../models/archivoModel');

exports.obtenerArchivos = async (req, res) => {
  const archivos = await ArchivoModel.obtenerTodos();
  res.json(archivos);
};

exports.obtenerArchivoPorId = async (req, res) => {
  const archivo = await ArchivoModel.obtenerPorId(req.params.id);
  if (!archivo) return res.status(404).json({ mensaje: 'Archivo no encontrado' });
  res.json(archivo);
};

exports.crearArchivo = async (req, res) => {
  const nuevo = await ArchivoModel.crear(req.body);
  res.status(201).json(nuevo);
};

exports.eliminarArchivo = async (req, res) => {
  await ArchivoModel.eliminar(req.params.id);
  res.json({ mensaje: 'Archivo eliminado' });
};


exports.editarArchivo = async (req, res) => {
  const { id } = req.params;
  const archivoExistente = await ArchivoModel.obtenerPorId(id);

  if (!archivoExistente) {
    return res.status(404).json({ mensaje: 'Archivo no encontrado' });
  }

  const actualizado = await ArchivoModel.editar(id, req.body);
  res.json(actualizado);
};


exports.obtenerArchivosDelUsuario = async (req, res) => {
  const usuarioId = req.usuario.id; 
  try {
    const archivos = await ArchivoModel.obtenerPorUsuario(usuarioId);
    res.json(archivos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener archivos del usuario' });
  }
};


