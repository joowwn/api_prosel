const { db } = require('../models/db');

class UserModel {
  constructor() {}

  getAllUsers(callback) {
    const getAllUsersQuery = `
      SELECT * FROM Users
    `;

    db.query(getAllUsersQuery, (err, result) => {
      if (err) {
        return callback(err, null);
      }

      return callback(null, result);
    });
  }
}

module.exports = new UserModel();