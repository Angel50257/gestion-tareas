const sql = require('mssql');

const ArchivoModel = {
  async obtenerTodos() {
    const result = await sql.query`SELECT * FROM Archivos`;
    return result.recordset;
  },

  async obtenerPorId(id) {
    const result = await sql.query`SELECT * FROM Archivos WHERE id = ${id}`;
    return result.recordset[0];
  },

  async crear(archivo) {
  const result = await sql.query`
    INSERT INTO Archivos (tarea_id, nombre_archivo, nombre_original, ruta_archivo)
    OUTPUT INSERTED.*
    VALUES (${archivo.tarea_id}, ${archivo.nombre_archivo}, ${archivo.nombre_original}, ${archivo.ruta_archivo})
  `;
  return result.recordset[0];
},

/* nueva funcion para editar */
            async editar(id, archivo) {
      const result = await sql.query`
        UPDATE Archivos
        SET 
          nombre_archivo = ${archivo.nombre_archivo},
          nombre_original = ${archivo.nombre_original},
          ruta_archivo = ${archivo.ruta_archivo},
          fecha_subida = GETDATE()
        OUTPUT INSERTED.*
        WHERE id = ${id}
      `;
      return result.recordset[0];
    },

  async eliminar(id) {
    await sql.query`DELETE FROM Archivos WHERE id = ${id}`;
  },


  /* archivos por user */
  async obtenerPorUsuario(usuarioId) {
  const result = await sql.query`
    SELECT A.*
    FROM Archivos A
    INNER JOIN Tareas T ON A.tarea_id = T.id
    WHERE T.usuario_id = ${usuarioId}
  `;
  return result.recordset;
}


};

module.exports = ArchivoModel;
