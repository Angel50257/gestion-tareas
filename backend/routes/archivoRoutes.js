const express = require('express');
const router = express.Router();
const archivoCtrl = require('../controllers/archivoController');
const { verificarToken } = require('../middlewares/authMiddleware');

// ✅ Ruta específica primero
router.get('/mis-archivos', verificarToken, archivoCtrl.obtenerArchivosDelUsuario);

// Luego las rutas generales
router.get('/', verificarToken, archivoCtrl.obtenerArchivos);
router.get('/:id', verificarToken, archivoCtrl.obtenerArchivoPorId);
router.post('/', verificarToken, archivoCtrl.crearArchivo);
router.put('/:id', verificarToken, archivoCtrl.editarArchivo);
router.delete('/:id', verificarToken, archivoCtrl.eliminarArchivo);

module.exports = router;
