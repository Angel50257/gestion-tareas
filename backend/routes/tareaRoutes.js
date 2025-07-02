const express = require('express');
const router = express.Router();
const tareaCtrl = require('../controllers/tareaController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', verificarToken, tareaCtrl.listar);
router.get('/:id', verificarToken, tareaCtrl.obtener);
router.post('/', verificarToken, tareaCtrl.crear);
router.put('/:id', verificarToken, tareaCtrl.actualizar);
router.delete('/:id', verificarToken, tareaCtrl.eliminar);

module.exports = router;
