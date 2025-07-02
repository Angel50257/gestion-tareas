// backend/routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verificarToken = require('../middlewares/authMiddleware');
const { registrarUsuario, loginUsuario } = require('../controllers/usuarioController');
// const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');

// router.get('/', usuarioController.listar);
router.get('/', verificarToken, usuarioController.listar);

router.get('/:id', usuarioController.obtener);
router.post('/', usuarioController.crear);
router.put('/:id', usuarioController.actualizar);
router.delete('/:id', usuarioController.eliminar);
/* registrarse */
router.post('/register', registrarUsuario);
/* login */
router.post('/login', loginUsuario);


module.exports = router;
