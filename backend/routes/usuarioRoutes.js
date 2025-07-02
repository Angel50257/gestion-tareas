// backend/routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { registrarUsuario, loginUsuario } = require('../controllers/usuarioController');
// const verificarToken = require('../middlewares/authMiddleware');
// const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');
const { verificarToken } = require('../middlewares/authMiddleware');

// router.get('/', usuarioController.listar);
router.get('/', verificarToken, usuarioController.listar);

router.get('/:id', verificarToken, usuarioController.obtener);
router.post('/', verificarToken, usuarioController.crear);
router.put('/:id', verificarToken, usuarioController.actualizar);
router.delete('/:id', verificarToken, usuarioController.eliminar);
/* registrarse */
router.post('/register', registrarUsuario);
/* login */
router.post('/login', loginUsuario);


module.exports = router;
