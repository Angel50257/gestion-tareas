const sql = require('mssql');

const UsuarioModel = {
  // Obtener todos los usuarios
  async obtenerTodos() {
    const result = await sql.query`SELECT * FROM Usuarios`;
    return result.recordset;
  },

  // Obtener un usuario por ID
  async obtenerPorId(id) {
    const result = await sql.query`SELECT * FROM Usuarios WHERE id = ${id}`;
    return result.recordset[0];
  },

  // Crear un nuevo usuario
  async crear(usuario) {
    const result = await sql.query`
      INSERT INTO Usuarios (nombre, correo, contrasena, rol_id)
      OUTPUT INSERTED.id
      VALUES (${usuario.nombre}, ${usuario.correo}, ${usuario.contrasena}, ${usuario.rol_id})
    `;
    return result.recordset[0].id;
  },

  // Actualizar un usuario existente
  async actualizar(id, usuario) {
    await sql.query`
      UPDATE Usuarios 
      SET nombre = ${usuario.nombre}, 
          correo = ${usuario.correo}, 
          contrasena = ${usuario.contrasena}, 
          rol_id = ${usuario.rol_id}
      WHERE id = ${id}
    `;
  },

  // Eliminar un usuario por ID
  async eliminar(id) {
    await sql.query`DELETE FROM Usuarios WHERE id = ${id}`;
  }
};

module.exports = UsuarioModel;
