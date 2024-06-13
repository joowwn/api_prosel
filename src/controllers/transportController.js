const TransportModel = require('../models/transportModel');
const HistoricoModel = require('../models/historicModel');
const IncidentModel = require('../models/IncidentModel');

class TransportController {
  constructor() {}

  getAllTransportRequests(req, res) {
    TransportModel.getAllTransportRequests((err, requests) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      return res.status(200).json(requests);
    });
  }

  getTransportRequestById(req, res) {
    const { id } = req.params;
    TransportModel.getTransportRequestById(id, (err, request) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      if (!request) {
        return res.status(404).json({ message: 'Solicitação de transporte não encontrada' });
      }
      return res.status(200).json(request);
    });
  }

  getTransportRequestsByMaqueiroId(req, res) {
    const { maqueiro_id } = req.params;
    TransportModel.getTransportRequestsByMaqueiroId(maqueiro_id, (err, requests) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      if (!requests || requests.length === 0) {
        return res.status(404).json({ message: 'Nenhuma solicitação de transporte encontrada para o maqueiro especificado' });
      }
      return res.status(200).json(requests);
    });
  }

  createTransportRequest(req, res) {
    const data = req.body;
    TransportModel.insertTransportRequest(data, (err, insertId) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      const description = 'Solicitação de transporte criada';

      HistoricoModel.registrarHistorico(insertId, description, (err) => {
        if (err) {
          console.log("Erro ao registrar no histórico: ", err);
        }
      });
      return res.status(201).json({ message: 'Solicitação de transporte criada com sucesso', id: insertId });
    });
  }

  updateTransportRequest(req, res) {
    const { id } = req.params;
    const data = req.body;
    TransportModel.updateTransportRequest(id, data, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      const description = 'Solicitação de transporte atualizada';

      HistoricoModel.registrarHistorico(id, description, (err) => {
        if (err) {
          console.log("Erro ao registrar no histórico: ", err);
        }
      });
      return res.status(200).json({ message: 'Solicitação de transporte atualizada com sucesso' });
    });
  }

  async deleteTransportRequest(req, res) {
    const { id } = req.params;

    try {
      await new Promise((resolve, reject) => {
        IncidentModel.deleteIncidentsBySolicitacaoId(id, (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });

      await new Promise((resolve, reject) => {
        TransportModel.deleteTransportRequest(id, (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });

      res.status(200).json({ message: 'Solicitação de transporte deletada com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar solicitação de transporte:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  updateTransportRequestPriority(req, res) {
    const { id } = req.params;
    const { priority } = req.body;

    TransportModel.updateTransportRequestPriority(id, priority, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

      const description = `Solicitação de transporte priorizada como ${priority}`;

      HistoricoModel.registrarHistorico(id, description, (err) => {
        if (err) {
          console.log("Erro ao registrar no histórico: ", err);
        }
      });
      return res.status(200).json({ message: 'Prioridade da solicitação de transporte atualizada com sucesso' });
    });
  }

  updateTransportRequestStatus(req, res) {
    const { id } = req.params;
    const { request_status } = req.body;

    TransportModel.updateTransportRequestStatus(id, request_status, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      
      let description = 'Solicitação de transporte atualizada';
      if (request_status === 'Aceito') {
        description = 'Solicitação de transporte aceita';
      } else if (request_status === 'Negado') {
        description = 'Solicitação de transporte negada';
      }
      else if (request_status === 'Pendente') {
        description = 'Solicitação de transporte pendente';
      }

      HistoricoModel.registrarHistorico(id, description, (err) => {
        if (err) {
          console.log("Erro ao registrar no histórico: ", err);
        }
      });

      return res.status(200).json({ message: 'Status de solicitação de transporte atualizada com sucesso' });
    });
  }

  updateTransportStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    TransportModel.updateTransportStatus(id, status, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

      const description = `Status de transporte atualizado para ${status}`;

      HistoricoModel.registrarHistorico(id, description, (err) => {
        if (err) {
          console.log("Erro ao registrar no histórico:", err);
        }
      });

      return res.status(200).json({ message: 'Status de transporte atualizado com sucesso' });
    });
  }
}

module.exports = new TransportController();