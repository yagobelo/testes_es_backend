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

      const hospedeCreated = await pool.query(
        "INSERT INTO hospedes (nome, data_nascimento, telefone, email, rg, pais, estado, cidade, logradouro, numero_endereco, bairro, complemento_endereco, create_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
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
          data.toLocaleString("pt-BR", {
            timeZone: "America/Maceio",
          }),
        ]
      );

      if (hospedeCreated.rowCount < 1) {
        return res.status(400).json({ mensagem: "Hospede não foi Criado." });
      }

      res.status(201);
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
  },
};

module.exports = hospedesControllers;
