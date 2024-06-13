const express = require('express');
const LoginController = require('../controllers/loginController');
const UserController = require('../controllers/userController');
const TransportController = require('../controllers/transportController');
const HistoricController = require('../controllers/historicController');
const IncidentController = require('../controllers/IncidentController');

class ConsultasRoute {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Rotas de Login e Cadastro
    this.router.post('/login', (req, res) => LoginController.fazerLogin(req, res));
    this.router.post('/register', (req, res) => LoginController.cadastrarUsuario(req, res));
    this.router.post('/update-password', (req, res) => LoginController.updatePassword(req, res));
    this.router.post('/verify-first-access', (req, res) => LoginController.verificarPrimeiroAcesso(req, res));

    // Rota de Usuários
    this.router.get('/users', (req, res) => UserController.getAllUsers(req, res));

    // Rota de Solicitações de Transporte
    this.router.get('/transport-requests', (req, res) => TransportController.getAllTransportRequests(req, res));
    this.router.get('/transport-requests/:id', (req, res) => TransportController.getTransportRequestById(req, res));
    this.router.get('/transport-requests/maqueiro/:maqueiro_id', (req, res) => TransportController.getTransportRequestsByMaqueiroId(req, res));
    this.router.post('/transport-requests', (req, res) => TransportController.createTransportRequest(req, res));
    this.router.put('/transport-requests/:id', (req, res) => TransportController.updateTransportRequest(req, res));
    this.router.delete('/transport-requests/:id', (req, res) => TransportController.deleteTransportRequest(req, res));
    this.router.put('/transport-requests/:id/status', (req, res) => TransportController.updateTransportStatus(req, res));
    this.router.put('/transport-requests/:id/reject', TransportController.rejectTransportRequest);

    // Rota de Priorização de Transporte
    this.router.put('/transport-requests/:id/priority', (req, res) => TransportController.updateTransportRequestPriority(req, res));

    // Rota de atualização de Status 
    this.router.put('/transport-requests/:id/request-status', (req, res) => TransportController.updateTransportRequestStatus(req, res));

    // Rota para obter o histórico de uma solicitação de transporte
    this.router.get('/historic/:solicitacaoId', (req, res) => HistoricController.getHistoricoBySolicitacaoId(req, res));
    this.router.post('/historic', (req, res) => HistoricController.registrarHistorico(req, res));

    // Rotas de Incidentes
    this.router.get('/incidents', (req, res) => IncidentController.getAllIncidents(req, res));
    this.router.get('/incidents/:id', (req, res) => IncidentController.getIncidentById(req, res));
    this.router.get('/incidents/maqueiro/:maqueiro_id', (req, res) => IncidentController.getIncidentsByMaqueiroId(req, res));
    this.router.get('/incidents/solicitacao/:solicitacaoId', (req, res) => IncidentController.getIncidentsBySolicitacaoId(req, res));
    this.router.post('/incidents', (req, res) => IncidentController.createIncident(req, res));
    this.router.put('/incidents/:id', (req, res) => IncidentController.updateIncident(req, res));
    this.router.delete('/incidents/:id', (req, res) => IncidentController.deleteIncident(req, res));
    this.router.delete('/incidents/solicitacao/:solicitacaoId', (req, res) => IncidentController.deleteIncidentsBySolicitacaoId(req, res));
  }
}

module.exports = new ConsultasRoute().router;