const jwt = require('jsonwebtoken');
const LoginModel = require('../models/loginModel');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

class LoginController {
  constructor() {
    this.secretKey = 'secret_key';
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'joohnzay@gmail.com',
        pass: 'rudb agai kgmt ilvl'
      }
    });
  }

  cadastrarUsuario(req, res) {
    const { name, username, email } = req.body;
    const password = this.generateRandomPassword();

    LoginModel.getUserByUsername(username, (err, userData) => {
      if (err) {
        console.error('Erro ao consultar usuário por nome de usuário:', err);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

      if (userData && userData.length > 0) {
        return res.status(409).json({ message: 'Usuário já existe' });
      }

      LoginModel.insertUser(name, username, password, email, (err) => {
        if (err) {
          console.error('Erro ao cadastrar usuário no banco de dados:', err);
          return res.status(500).json({ message: 'Erro interno do servidor' });
        }

        this.sendPasswordEmail(email, username, password)
          .then(() => {
            console.log('Email enviado com sucesso');
            return res.status(201).json({ message: 'Usuário cadastrado com sucesso e senha enviada por email' });
          })
          .catch(emailErr => {
            console.error('Erro ao enviar email:', emailErr);
            return res.status(500).json({ message: 'Usuário cadastrado, mas erro ao enviar email' });
          });
      });
    });
  }

  verificarPrimeiroAcesso(req, res) {
    const { username, password } = req.body;

    LoginModel.getUserByUsername(username, (err, userData) => {
      if (err) {
        console.error('Erro ao consultar usuário por nome de usuário:', err);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

      if (Array.isArray(userData) && userData.length === 1) {
        const { id, password: storedPassword, first_access } = userData[0];

        if (first_access === 0) {
          const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

          if (storedPassword === hashedPassword) {
            return res.status(200).json({ first_access, userid: id });
          } else {
            return res.status(401).json({ message: 'Senha não coincide com a senha aleatória' });
          }
        } else {
          return res.status(200).json({ first_access, userid: id });
        }
      } else {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
    });
  }

  fazerLogin(req, res) {
    const { username, password } = req.body;

    LoginModel.getUserByUsernameAndPassword(username, password, (err, userData) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

      if (Array.isArray(userData) && userData.length === 1) {
        const { id, username, name, perms, role } = userData[0];

        const userInfo = {
          userid: id,
          user: username,
          name: name,
          perms: perms,
          role: role
        };

        const token = jwt.sign(userInfo, this.secretKey, { expiresIn: '5h' });

        return res.status(200).json({ authenticated: true, token });
      } else {
        return res.status(401).json({ authenticated: false, message: 'Credenciais inválidas' });
      }
    });
  }

  updatePassword(req, res) {
    const { userId, newPassword } = req.body;

    LoginModel.updatePassword(userId, newPassword, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao atualizar a senha' });
      }

      return res.status(200).json({ message: 'Senha atualizada com sucesso' });
    });
  }

  generateRandomPassword() {
    return crypto.randomBytes(8).toString('hex');
  }

  sendPasswordEmail(email, username, password) {
    const mailOptions = {
      from: 'joohnzay@gmail.com',
      to: email,
      subject: 'Cadastro no Sistema de Gerenciamento de Macas',
      text: `Olá,

Seu cadastro foi realizado com sucesso. Aqui estão seus detalhes de acesso:

Usuário: ${username}
Senha: ${password}

Por favor, troque sua senha após o primeiro login.

Atenciosamente,
Equipe do Sistema de Gerenciamento de Macas`
    };

    return this.transporter.sendMail(mailOptions);
  }
}

module.exports = new LoginController();