const express = require('express');
const cors = require('cors');
const consultaRouter = require('./routes/consultasRoute.js');

class Server {
  constructor() {
    this.app = express();
    this.port = 3333;
    this.middlewares();
    this.routes();
    this.errorHandling();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors({ origin: '*' }));
  }

  routes() {
    this.app.use(consultaRouter);
  }

  errorHandling() {
    this.app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`API rodando com sucesso em HTTPS na porta ${this.port}!`);
    });
  }
}

const server = new Server();
server.listen();