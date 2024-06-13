const HistoricModel = require('../models/historicModel');

class HistoricController {
  constructor() {}

  getHistoricoBySolicitacaoId(req, res) {
    const { solicitacaoId } = req.params;

    HistoricModel.getHistoricoBySolicitacaoId(solicitacaoId, (err, historico) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao recuperar o histórico' });
      }
      if (historico.length === 0) {
        return res.status(404).json({ message: 'Histórico não encontrado para esta solicitação' });
      }
      return res.status(200).json(historico);
    });
  }
}

module.exports = new HistoricController();