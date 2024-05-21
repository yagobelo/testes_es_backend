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
      const data_checkin_formatada = new Date(data_checkin).toLocaleDateString(
        "pt-BR"
      );
      const data_checkout_formatada = new Date(
        data_checkout
      ).toLocaleDateString("pt-BR");

      const reservaCreated = await pool.query(
        "INSERT INTO reservas (rg_hospede, data_checkin, data_checkout, status_reserva, create_at) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [
          rg_hospede,
          data_checkin_formatada,
          data_checkout_formatada,
          status_reserva,
          dataNow,
        ]
      );

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
  async listarReservas(req, res) {
    try {
      const reservas = await pool.query(
        "SELECT * FROM reservas ORDER BY id DESC"
      );

      res.status(200).json(reservas.rows);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
  },
  async buscarReserva(req, res) {
    try {
      const { id } = req.params;

      const reserva = await pool.query("SELECT * FROM reservas WHERE id = $1", [
        id,
      ]);

      res.status(200).json(reserva.rows[0]);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
  },
  async editarReserva(req, res) {
    try {
      const { id } = req.params;
      const { data_checkin, data_checkout, status_reserva } = req.body;

      const reservaExist = await pool.query(
        "SELECT * FROM reservas WHERE id = $1",
        [id]
      );

      if (reservaExist.rowCount < 1) {
        return res.status(404).json({ mensagem: "Reserva não encontrada." });
      }

      const data_checkin_formatada = new Date(data_checkin).toLocaleDateString(
        "pt-BR"
      );
      const data_checkout_formatada = new Date(
        data_checkout
      ).toLocaleDateString("pt-BR");

      await pool.query(
        "UPDATE reservas SET data_checkin = $1, data_checkout = $2, status_reserva = $3 WHERE id = $4",
        [data_checkin_formatada, data_checkout_formatada, status_reserva, id]
      );

      res.status(200).json({ mensagem: "Reserva atualizada." });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
  },
};

module.exports = reservasControllers;
