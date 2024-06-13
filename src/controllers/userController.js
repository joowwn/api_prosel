const UserModel = require('../models/userModel');

class UserController {
  constructor() {}

  getAllUsers(req, res) {
    UserModel.getAllUsers((err, result) => {
      if (err) {
        console.error('Erro ao obter todos os usuários:', err);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

      return res.status(200).json(result);
    });
  }
}

module.exports = new UserController();