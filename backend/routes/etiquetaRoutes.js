const express = require('express');
const router = express.Router();
const controller = require('../controllers/etiquetaController');

router.get('/', controller.getEtiquetas);
router.get('/:id', controller.getEtiqueta);
router.post('/', controller.createEtiqueta);
router.put('/:id', controller.updateEtiqueta);
router.delete('/:id', controller.deleteEtiqueta);

module.exports = router;
