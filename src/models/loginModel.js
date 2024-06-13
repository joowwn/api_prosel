const { db } = require('../models/db');

class LoginModel {
  constructor() {}

  getUserByUsername(username, callback) {
    const userQuery = `
      SELECT * 
      FROM Users
      WHERE username = ?
    `;

    db.query(userQuery, [username], (err, userData) => {
      if (err) {
        console.error('Erro ao consultar usuário por nome de usuário:', err);
        return callback(err, null);
      }

      return callback(null, userData);
    });
  }

  getUserByUsernameAndPassword(username, password, callback) {
    const userQuery = `
      SELECT * 
      FROM Users
      WHERE username = ? AND password = SHA2(?, 256)
    `;

    db.query(userQuery, [username, password], (err, userData) => {
      if (err) {
        console.error('Erro ao consultar usuário por nome de usuário e senha:', err);
        return callback(err, null);
      }

      return callback(null, userData);
    });
  }

  insertUser(name, username, password, email, callback) {
    const insertUserQuery = `
      INSERT INTO Users (name, username, password, email, first_access)
      VALUES (?, ?, SHA2(?, 256), ?, 0)
    `;
  
    db.query(insertUserQuery, [name, username, password, email], (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar usuário na tabela Users:', err);
        return callback(err);
      }
  
      return callback(null);
    });
  }

  updatePassword(userId, newPassword, callback) {
    const updatePasswordQuery = `
      UPDATE Users
      SET password = SHA2(?, 256), first_access = 1
      WHERE id = ?
    `;

    db.query(updatePasswordQuery, [newPassword, userId], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar a senha do usuário:', err);
        return callback(err);
      }

      return callback(null);
    });
  }
}

module.exports = new LoginModel();