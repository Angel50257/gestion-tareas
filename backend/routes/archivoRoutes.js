const express = require('express');
const router = express.Router();
const archivoCtrl = require('../controllers/archivoController');

router.get('/', archivoCtrl.obtenerArchivos);
router.get('/:id', archivoCtrl.obtenerArchivoPorId);
router.post('/', archivoCtrl.crearArchivo);
router.put('/:id', archivoCtrl.editarArchivo);
router.delete('/:id', archivoCtrl.eliminarArchivo);

module.exports = router;
