const sql = require('../database');

const EtiquetaModel = {
    getAll: async () => {
        const result = await sql.query`SELECT * FROM Etiquetas`;
        return result.recordset;
    },

    getById: async (id) => {
        const result = await sql.query`SELECT * FROM Etiquetas WHERE id = ${id}`;
        return result.recordset[0];
    },

    create: async (nombre) => {
        const result = await sql.query`INSERT INTO Etiquetas (nombre) OUTPUT INSERTED.* VALUES (${nombre})`;
        return result.recordset[0];
    },

    update: async (id, nombre) => {
        const result = await sql.query`
            UPDATE Etiquetas SET nombre = ${nombre} WHERE id = ${id};
            SELECT * FROM Etiquetas WHERE id = ${id};
        `;
        return result.recordset[0];
    },

    delete: async (id) => {
        await sql.query`DELETE FROM Etiquetas WHERE id = ${id}`;
    }
};

module.exports = EtiquetaModel;
