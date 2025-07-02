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
      INSERT INTO Archivos (tarea_id, nombre_archivo, ruta_archivo)
      OUTPUT INSERTED.*
      VALUES (${archivo.tarea_id}, ${archivo.nombre_archivo}, ${archivo.ruta_archivo})
    `;
    return result.recordset[0];
  },

        async editar(id, archivo) {
        const result = await sql.query`
          UPDATE Archivos
          SET 
            tarea_id = ${archivo.tarea_id},
            nombre_archivo = ${archivo.nombre_archivo},
            ruta_archivo = ${archivo.ruta_archivo},
            fecha_subida = GETDATE()
          OUTPUT INSERTED.*
          WHERE id = ${id}
        `;
        return result.recordset[0];
      },

  async eliminar(id) {
    await sql.query`DELETE FROM Archivos WHERE id = ${id}`;
  }
};

module.exports = ArchivoModel;
