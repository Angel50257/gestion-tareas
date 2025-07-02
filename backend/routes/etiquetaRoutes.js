const express = require('express');
const router = express.Router();
const controller = require('../controllers/etiquetaController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', verificarToken, controller.getEtiquetas);
router.get('/:id', verificarToken, controller.getEtiqueta);
router.post('/', verificarToken, controller.createEtiqueta);
router.put('/:id', verificarToken, controller.updateEtiqueta);
router.delete('/:id', verificarToken, controller.deleteEtiqueta);

module.exports = router;
