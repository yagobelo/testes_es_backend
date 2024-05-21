const { query } = require("express");
const pool = require("../db/ConnetionDB");

const reservasControllers = {
  async cadastrarReservas(req, res) {
    try {
      const { rg_hospede, data_checkin, data_checkout, status_reserva } =
        req.body;

      const hospedeExist = await pool.query(
        "SELECT * FROM hospedes WHERE rg = $1",
        [rg_hospede]
      );

      if (hospedeExist.rowCount < 1) {
        return res
          .status(400)
          .json({ mensagem: "Não foi encontrado hospede com o RG informado." });
      }

      const data = new Date();
      const dataNow = data.toLocaleString("pt-BR", {
        timeZone: "America/Maceio",
      });

      const reservaCreated = await pool.query(
        "INSERT INTO reservas (rg_hospede, data_checkin, data_checkout, status_reserva, create_at) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [rg_hospede, data_checkin, data_checkout, status_reserva, dataNow]
      );

      console.log(reservaCreated);

      const vinculoCreated = await pool.query(
        "INSERT INTO reserva_hospedes (hospede_id, reserva_id, create_at) VALUES ($1, $2, $3)",
        [hospedeExist.rows[0].id, reservaCreated.rows[0].id, dataNow]
      );

      if (vinculoCreated.rowCount < 1) {
        return res.status(400).json({
          mensagem: "Vinculo de reserva e hospede não foi realizado.",
        });
      }

      if (reservaCreated.rowCount < 1) {
        return res.status(400).json({ mensagem: "Reserva não foi criada." });
      }

      res.status(201).json({ mensagem: "Reserva Criada." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
  },
};

module.exports = reservasControllers;
