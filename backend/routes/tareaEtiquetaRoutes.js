const express = require('express');
const router = express.Router();
const tareaEtiquetaCtrl = require('../controllers/tareaEtiquetaController');
const { verificarToken } = require('../middlewares/authMiddleware');

// Usar 'tareaEtiquetaCtrl' en lugar de 'controller'
router.get('/', verificarToken, tareaEtiquetaCtrl.listar);
router.get('/:tarea_id', verificarToken, tareaEtiquetaCtrl.listarPorTarea);
router.post('/', verificarToken, tareaEtiquetaCtrl.agregar);
router.put('/', verificarToken, tareaEtiquetaCtrl.editar);
router.delete('/', verificarToken, tareaEtiquetaCtrl.eliminar);

module.exports = router;
