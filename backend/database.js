const sql = require('mssql');

const config = {
    user: 'usuario_final',
    password: '123456',
    server: 'localhost',
    database: 'SistemaTareas',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

sql.connect(config)
    .then(() => console.log('🟢 Conectado a SQL Server'))
    .catch(err => console.error('❌ Error de conexión:', err));

module.exports = sql;

