const { db } = require('./db');

class TransportModel {
  constructor() {}

  getAllTransportRequests(callback) {
    const query = `
      SELECT TransportRequests.*, Users.name as maqueiro_name
      FROM TransportRequests
      JOIN Users ON TransportRequests.maqueiro_id = Users.id
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao consultar todas as solicitações de transporte:', err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  }

  getTransportRequestById(id, callback) {
    const query = `
      SELECT TransportRequests.*, Users.name as maqueiro_name
      FROM TransportRequests
      JOIN Users ON TransportRequests.maqueiro_id = Users.id
      WHERE TransportRequests.id = ?
    `;
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Erro ao consultar solicitação de transporte por ID:', err);
        return callback(err, null);
      }
      return callback(null, results[0]);
    });
  }

  getTransportRequestsByMaqueiroId(maqueiro_id, callback) {
    const query = `
      SELECT TransportRequests.*, Users.name as maqueiro_name
      FROM TransportRequests
      JOIN Users ON TransportRequests.maqueiro_id = Users.id
      WHERE TransportRequests.maqueiro_id = ?
    `;
    db.query(query, [maqueiro_id], (err, results) => {
      if (err) {
        console.error('Erro ao consultar solicitações de transporte por ID do maqueiro:', err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  }

  insertTransportRequest(data, callback) {
    const query = `
      INSERT INTO TransportRequests (patient_name, data, initial_point, destination_point, maqueiro_id, priority, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [data.patient_name, data.data, data.initial_point, data.destination_point, data.maqueiro_id, data.priority, data.status];
    db.query(query, params, (err, result) => {
      if (err) {
        console.error('Erro ao inserir solicitação de transporte:', err);
        return callback(err);
      }
      return callback(null, result.insertId);
    });
  }

  updateTransportRequest(id, data, callback) {
    const fields = ['patient_name', 'status', 'priority', 'data', 'initial_point', 'destination_point', 'maqueiro_id'];
    let updates = [];
    let params = [];

    fields.forEach(field => {
      if (data.hasOwnProperty(field) && data[field] !== undefined) {
        updates.push(`${field} = ?`);
        params.push(data[field]);
      }
    });

    if (updates.length === 0) {
      return callback(new Error("Sem campos validos para atualizar"), null);
    }
    params.push(id);

    const query = `UPDATE TransportRequests SET ${updates.join(', ')} WHERE id = ?`;

    db.query(query, params, (err) => {
      if (err) {
        console.error('Erro ao atualizar solicitação de transporte:', err);
        return callback(err);
      }
      return callback(null);
    });
  }

  deleteTransportRequest(id, callback) {
    const query = 'DELETE FROM TransportRequests WHERE id = ?';
    db.query(query, [id], (err) => {
      if (err) {
        console.error('Erro ao deletar solicitação de transporte:', err);
        return callback(err);
      }
      return callback(null);
    });
  }

  updateTransportRequestPriority(id, priority, callback) {
    const query = 'UPDATE TransportRequests SET priority = ? WHERE id = ?';
    db.query(query, [priority, id], (err) => {
      if (err) {
        console.error('Erro ao atualizar a prioridade da solicitação de transporte:', err);
        return callback(err);
      }
      return callback(null);
    });
  }

  updateTransportRequestStatus(id, request_status, callback) {
    const query = 'UPDATE TransportRequests SET request_status = ? WHERE id = ?';
    db.query(query, [request_status, id], (err) => {
      if (err) {
        console.error('Erro ao atualizar o status da solicitação de transporte:', err);
        return callback(err);
      }
      return callback(null);
    });
  }

  updateTransportStatus(id, status, callback) {
    const query = 'UPDATE TransportRequests SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err) => {
      if (err) {
        console.error('Erro ao atualizar o status de transporte:', err);
        return callback(err);
      }
      return callback(null);
    });
  }
}

module.exports = new TransportModel();