const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const Usuario = require('../models/usuarioModel');
const { registrarUsuario, loginUsuario } = require('../controllers/usuarioController');
const { verificarToken } = require('../middlewares/authMiddleware');

/* Rutas públicas */
router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);

/* Rutas protegidas */
router.put('/perfil', verificarToken, usuarioController.actualizarPerfil);
router.get('/perfil-datos', verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.obtenerPorId(req.usuario.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    // Solo devolvemos nombre y correo
    res.json({
      nombre: usuario.nombre,
      correo: usuario.correo
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener perfil', error: err.message });
  }
});

router.get('/', usuarioController.listar);
router.get('/:id', verificarToken, usuarioController.obtener);
router.post('/', verificarToken, usuarioController.crear);
router.put('/:id', verificarToken, usuarioController.actualizar);
router.delete('/:id', verificarToken, usuarioController.eliminar);

module.exports = router;
