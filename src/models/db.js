const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'viaduct.proxy.rlwy.net',
  user: 'root',
  password: 'wSioyeIXLVpOzcrkqiPbrsADpdFvLmLS',
  database: 'railway',
  port: 43603,
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar-se ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  }
});

module.exports = { db };
