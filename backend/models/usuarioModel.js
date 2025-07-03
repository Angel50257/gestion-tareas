const sql = require('mssql');

const UsuarioModel = {
  // Obtener todos los usuarios
  async obtenerTodos() {
    const result = await sql.query`SELECT * FROM Usuarios`;
    return result.recordset;
  },

  async obtenerPorRol(rol_id) {
    const pool = await sql.connect();
    const result = await pool.request()
      .input('rol_id', sql.Int, rol_id)
      .query('SELECT * FROM Usuarios WHERE rol_id = @rol_id');
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

  
  async actualizar(id, usuario) {
  const campos = [];
  const inputs = [];

  if (usuario.nombre !== undefined) {
    campos.push(`nombre = @nombre`);
    inputs.push({ name: 'nombre', type: sql.NVarChar, value: usuario.nombre });
  }

  if (usuario.correo !== undefined) {
    campos.push(`correo = @correo`);
    inputs.push({ name: 'correo', type: sql.NVarChar, value: usuario.correo });
  }

  if (usuario.contrasena !== undefined) {
    campos.push(`contrasena = @contrasena`);
    inputs.push({ name: 'contrasena', type: sql.NVarChar, value: usuario.contrasena });
  }

  if (campos.length === 0) return;

  const setClause = campos.join(', ');
  const pool = await sql.connect();
  const request = pool.request();

  inputs.forEach(input => {
    request.input(input.name, input.type, input.value);
  });

  request.input('id', sql.Int, id);

  await request.query(`UPDATE Usuarios SET ${setClause} WHERE id = @id`);
},


  // Eliminar un usuario por ID
  async eliminar(id) {
    await sql.query`DELETE FROM Usuarios WHERE id = ${id}`;
  }
};

module.exports = UsuarioModel;
