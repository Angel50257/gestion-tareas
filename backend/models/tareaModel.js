const sql = require('../database');

const TareaModel = {
    async obtenerTodas() {
        const result = await sql.query('SELECT * FROM Tareas');
        return result.recordset;
    },

    async obtenerPorId(id) {
        const result = await sql.query`SELECT * FROM Tareas WHERE id = ${id}`;
        return result.recordset[0];
    },

    async crear(tarea) {
        const result = await sql.query`
            INSERT INTO Tareas (titulo, descripcion, estado, usuario_id)
            VALUES (${tarea.titulo}, ${tarea.descripcion}, ${tarea.estado}, ${tarea.usuario_id});
            SELECT SCOPE_IDENTITY() AS id;
        `;
        return result.recordset[0].id;
    },

    async actualizar(id, tarea) {
        await sql.query`
            UPDATE Tareas
            SET titulo = ${tarea.titulo},
                descripcion = ${tarea.descripcion},
                estado = ${tarea.estado},
                fecha_actualizacion = GETDATE()
            WHERE id = ${id}
        `;
    },

    async eliminar(id) {
        await sql.query`DELETE FROM Tareas WHERE id = ${id}`;
    }
};

module.exports = TareaModel;
