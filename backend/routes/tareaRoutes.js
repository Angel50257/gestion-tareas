const express = require('express');
const router = express.Router();
const tareaCtrl = require('../controllers/tareaController');

router.get('/', tareaCtrl.listar);
router.get('/:id', tareaCtrl.obtener);
router.post('/', tareaCtrl.crear);
router.put('/:id', tareaCtrl.actualizar);
router.delete('/:id', tareaCtrl.eliminar);

module.exports = router;
