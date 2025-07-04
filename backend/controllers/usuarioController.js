// backend/controllers/usuarioController.js
const Usuario = require('../models/usuarioModel');

const sql = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'tu_clave_secreta_aqui';  // Mejor poner en .env

module.exports = {
  // Listar todos los usuarios
  async listar(req, res) {
  try {
    const usuarios = await Usuario.obtenerPorRol(2);  // Solo usuarios con rol_id = 2
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},


  // Actualizar perfil usando el token
  async actualizarPerfil(req, res) {
    const idUsuario = req.usuario.id; // Obtenido desde el token JWT (middleware)
    const { nombre, correo, contrasena } = req.body;

    const datos = {};
    if (nombre) datos.nombre = nombre;
    if (correo) datos.correo = correo;

    if (contrasena) {
      try {
        const hashed = await bcrypt.hash(contrasena, 10);
        datos.contrasena = hashed;
      } catch (err) {
        return res.status(500).json({ mensaje: 'Error al encriptar contraseña' });
      }
    }

    try {
      await Usuario.actualizar(idUsuario, datos);
      res.json({ mensaje: 'Perfil actualizado correctamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al actualizar perfil' });
    }
  },


async obtenerPorRol(rol_id) {
  const pool = await sql.connect();
  const result = await pool.request()
    .input('rol_id', sql.Int, rol_id)
    .query('SELECT * FROM Usuarios WHERE rol_id = @rol_id');
  return result.recordset;
},


  // Obtener usuario 
  async obtener(req, res) {
    try {
      const usuario = await Usuario.obtenerPorId(req.params.id);
      if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },



  // Crear usuario y ademas que sea solo rol 2
  async crear(req, res) {
  try {
    // Forzar rol_id a 2
    req.body.rol_id = 2;

    const id = await Usuario.crear(req.body);
    res.status(201).json({ mensaje: 'Usuario creado', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},


  // Actualizar usuario
  async actualizar(req, res) {
    try {
      await Usuario.actualizar(req.params.id, req.body);
      res.json({ mensaje: 'Usuario actualizado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Eliminar usuario
  async eliminar(req, res) {
    try {
      await Usuario.eliminar(req.params.id);
      res.json({ mensaje: 'Usuario eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Registrar usuario con hash de contraseña
  async registrarUsuario(req, res) {
  const { nombre, correo, contrasena } = req.body; // 🔸 Quitamos rol_id del body

  try {
    const existe = await sql.query`SELECT * FROM Usuarios WHERE correo = ${correo}`;
    if (existe.recordset.length > 0) {
      return res.status(400).json({ mensaje: 'Correo ya registrado' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // 🔸 rol_id es siempre 2
    await sql.query`
      INSERT INTO Usuarios (nombre, correo, contrasena, rol_id)
      VALUES (${nombre}, ${correo}, ${hashedPassword}, 2)
    `;

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: err.message });
  }
},


  // Login y token JWT
  async loginUsuario(req, res) {
    const { correo, contrasena, obtenerToken } = req.body;

    try {
      const resultado = await sql.query`SELECT * FROM Usuarios WHERE correo = ${correo}`;
    if (resultado.recordset.length === 0) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    const usuario = resultado.recordset[0];
    const contrasenaEnBD = usuario.contrasena;
    let esValido = false;
    let necesitaHash = false;

    // Intenta comparar como hash
    try {
      esValido = await bcrypt.compare(contrasena, contrasenaEnBD);
    } catch {
      esValido = false;
    }

    // Si no es válida como hash, compara texto plano
    if (!esValido && contrasena === contrasenaEnBD) {
      esValido = true;
      necesitaHash = true;
    }

    if (!esValido) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    // Si necesita hash, actualizar contraseña en la BD
    if (necesitaHash) {
      const nuevaHash = await bcrypt.hash(contrasena, 10);
      await sql.query`
        UPDATE Usuarios SET contrasena = ${nuevaHash} WHERE id = ${usuario.id}
      `;
    }

    // Si pidió token
    if (obtenerToken) {
      const payload = {
        id: usuario.id,
        nombre: usuario.nombre,
        rol_id: usuario.rol_id
      };

      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

      return res.json({ mensaje: 'Login exitoso', token, rol_id: usuario.rol_id, nombre: usuario.nombre });
    } else {
      return res.json({ mensaje: 'Login exitoso', rol_id: usuario.rol_id, nombre: usuario.nombre });
    }

    } catch (err) {
      res.status(500).json({ mensaje: 'Error en el servidor', error: err.message });
    }
  }
};



