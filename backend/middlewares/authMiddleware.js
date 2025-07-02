const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tu_clave_secreta_aqui'; 

function verificarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ mensaje: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.usuario = decoded; // Guarda los datos decodificados del token
    next();
  } catch (err) {
    res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
}


// Verifica que el usuario sea admin (rol_id === 1)
function soloAdmin(req, res, next) {
  if (req.usuario && req.usuario.rol_id === 1) {
    next();
  } else {
    return res.status(403).json({ mensaje: 'Acceso restringido solo para administradores' });
  }
}


module.exports = verificarToken, soloAdmin;