const sql = require('mssql');

const config = {
    user: 'coder',
    password: 'coder',
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

