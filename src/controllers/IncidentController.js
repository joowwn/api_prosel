const IncidentModel = require('../models/IncidentModel');

class IncidentController {
  constructor() {}

  getAllIncidents(req, res) {
    IncidentModel.getAllIncidents((err, incidents) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      return res.status(200).json(incidents);
    });
  }

  getIncidentById(req, res) {
    const { id } = req.params;
    IncidentModel.getIncidentById(id, (err, incident) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      if (!incident) {
        return res.status(404).json({ message: 'Incidente não encontrado' });
      }
      return res.status(200).json(incident);
    });
  }

  getIncidentsByMaqueiroId(req, res) {
    const { maqueiro_id } = req.params;
    IncidentModel.getIncidentsByMaqueiroId(maqueiro_id, (err, incidents) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      if (!incidents || incidents.length === 0) {
        return res.status(404).json({ message: 'Nenhum incidente encontrado para o maqueiro especificado' });
      }
      return res.status(200).json(incidents);
    });
  }

  getIncidentsBySolicitacaoId(req, res) {
    const { solicitacaoId } = req.params;
    IncidentModel.getIncidentsBySolicitacaoId(solicitacaoId, (err, incidents) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao consultar incidentes por ID da solicitação' });
      }
      return res.json(incidents);
    });
  }

  createIncident(req, res) {
    const data = req.body;
    IncidentModel.createIncident(data, (err, insertId) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      return res.status(201).json({ message: 'Incidente criado com sucesso', id: insertId });
    });
  }

  updateIncident(req, res) {
    const { id } = req.params;
    const data = req.body;
    IncidentModel.updateIncident(id, data, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      return res.status(200).json({ message: 'Incidente atualizado com sucesso' });
    });
  }

  deleteIncident(req, res) {
    const { id } = req.params;
    IncidentModel.deleteIncident(id, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
      return res.status(200).json({ message: 'Incidente deletado com sucesso' });
    });
  }
}

module.exports = new IncidentController();