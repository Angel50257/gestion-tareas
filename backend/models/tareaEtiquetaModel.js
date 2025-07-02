const sql = require('../database');

const TareaEtiqueta = {
  obtenerTodas: async () => {
    const result = await sql.query('SELECT * FROM TareaEtiquetas');
    return result.recordset;
  },

  obtenerPorTarea: async (tarea_id) => {
    const result = await sql.query`SELECT * FROM TareaEtiquetas WHERE tarea_id = ${tarea_id}`;
    return result.recordset;
  },

  agregar: async (tarea_id, etiqueta_id) => {
    await sql.query`
      INSERT INTO TareaEtiquetas (tarea_id, etiqueta_id)
      VALUES (${tarea_id}, ${etiqueta_id})
    `;
  },

  eliminar: async (tarea_id, etiqueta_id) => {
    await sql.query`
      DELETE FROM TareaEtiquetas WHERE tarea_id = ${tarea_id} AND etiqueta_id = ${etiqueta_id}
    `;
  },

  editar: async (tarea_id, etiqueta_id, nueva_etiqueta_id) => {
    await sql.query`
      UPDATE TareaEtiquetas 
      SET etiqueta_id = ${nueva_etiqueta_id} 
      WHERE tarea_id = ${tarea_id} AND etiqueta_id = ${etiqueta_id}
    `;
  },
};

module.exports = TareaEtiqueta;
