const ArchivoModel = require('../models/archivoModel');
const path = require('path');

exports.obtenerArchivos = async (req, res) => {
  const archivos = await ArchivoModel.obtenerTodos();
  res.json(archivos);
};

exports.obtenerArchivoPorId = async (req, res) => {
  const archivo = await ArchivoModel.obtenerPorId(req.params.id);
  if (!archivo) return res.status(404).json({ mensaje: 'Archivo no encontrado' });
  res.json(archivo);
};

/* 
exports.crearArchivo = async (req, res) => {
  const nuevo = await ArchivoModel.crear(req.body);
  res.status(201).json(nuevo);
}; */


/* nueva función para ingresar archivo */
exports.crearArchivo = async (req, res) => {
  try {
    const archivo = req.file; // gracias a multer
    const { tarea_id } = req.body;

    const nuevo = await ArchivoModel.crear({
      tarea_id,
      nombre_archivo: archivo.filename, // nombre con el que se guarda
      nombre_original: archivo.originalname, // nombre original
      ruta_archivo: `/archivos/${archivo.filename}`
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al subir archivo' });
  }
};




exports.eliminarArchivo = async (req, res) => {
  await ArchivoModel.eliminar(req.params.id);
  res.json({ mensaje: 'Archivo eliminado' });
};

/* 
exports.editarArchivo = async (req, res) => {
  const { id } = req.params;
  const archivoExistente = await ArchivoModel.obtenerPorId(id);

  if (!archivoExistente) {
    return res.status(404).json({ mensaje: 'Archivo no encontrado' });
  }

  const actualizado = await ArchivoModel.editar(id, req.body);
  res.json(actualizado);
}; */

/* editar archivo nuevo */
exports.editarArchivo = async (req, res) => {
  const { id } = req.params;
  const archivoExistente = await ArchivoModel.obtenerPorId(id);

  if (!archivoExistente) {
    return res.status(404).json({ mensaje: 'Archivo no encontrado' });
  }

  let datosActualizados = {
    tarea_id: archivoExistente.tarea_id, // No se cambia
    nombre_archivo: archivoExistente.nombre_archivo,
    nombre_original: archivoExistente.nombre_original,
    ruta_archivo: archivoExistente.ruta_archivo,
  };

  if (req.file) {
    datosActualizados.nombre_archivo = req.file.filename;
    datosActualizados.nombre_original = req.file.originalname;
    datosActualizados.ruta_archivo = `/archivos/${req.file.filename}`;
  }

  const actualizado = await ArchivoModel.editar(id, datosActualizados);
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


