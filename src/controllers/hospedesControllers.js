const pool = require("../db/ConnetionDB");

const hospedesControllers = {
  async cadastrarHospedes(req, res) {
    try {
      const {
        nome,
        data_nascimento,
        telefone,
        email,
        rg,
        pais,
        estado,
        cidade,
        logradouro,
        numero_endereco,
        bairro,
        complemento_endereco,
      } = req.body;

      const hospedeExist = await pool.query(
        "SELECT * FROM hospedes WHERE rg = $1",
        [rg]
      );

      if (hospedeExist.rowCount > 0) {
        return res
          .status(400)
          .json({ mensagem: "Já existe hospede cadastrado com esse RG." });
      }

      const data = new Date();
      const dataNow = data.toLocaleString();
      const data_nascimento_formatada = new Date(
        data_nascimento
      ).toLocaleDateString("pt-BR");

      const hospedeCreated = await pool.query(
        "INSERT INTO hospedes (nome, data_nascimento, telefone, email, rg, pais, estado, cidade, logradouro, numero_endereco, bairro, complemento_endereco, create_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
        [
          nome,
          data_nascimento_formatada,
          telefone,
          email,
          rg,
          pais,
          estado,
          cidade,
          logradouro,
          numero_endereco,
          bairro,
          complemento_endereco,
          dataNow,
        ]
      );

      if (hospedeCreated.rowCount < 1) {
        return res.status(400).json({ mensagem: "Hospede não foi criado." });
      }

      res.status(201).json({ mensagem: "Hospede Criado." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
  },

  async listarHospedes(req, res) {
    try {
      const hospedes = await pool.query(
        "SELECT * FROM hospedes ORDER BY id DESC"
      );

      res.status(200).json(hospedes.rows);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
  },
  async buscarHospede(req, res) {
    try {
      const { id } = req.params;

      const hospede = await pool.query("SELECT * FROM hospedes WHERE id = $1", [
        id,
      ]);

      res.status(200).json(hospede.rows[0]);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
  },
  async editarHospedes(req, res) {
    try {
      const { id } = req.params;
      const {
        nome,
        data_nascimento,
        telefone,
        email,
        rg,
        pais,
        estado,
        cidade,
        logradouro,
        numero_endereco,
        bairro,
        complemento_endereco,
      } = req.body;

      const hospedeExist = await pool.query(
        "SELECT * FROM hospedes WHERE id = $1",
        [id]
      );

      if (hospedeExist.rowCount < 1) {
        return res.status(404).json({ mensagem: "Hospede não encontrado." });
      }

      await pool.query(
        "UPDATE hospedes SET nome = $1, data_nascimento = $2, telefone = $3, email = $4, rg = $5, pais = $6, estado = $7, cidade = $8, logradouro = $9, numero_endereco = $10, bairro = $11, complemento_endereco = $12 WHERE id = $13",
        [
          nome,
          data_nascimento,
          telefone,
          email,
          rg,
          pais,
          estado,
          cidade,
          logradouro,
          numero_endereco,
          bairro,
          complemento_endereco,
          id,
        ]
      );

      res.status(200).json({ mensagem: "Hospede atualizado." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
  },
};

module.exports = hospedesControllers;
