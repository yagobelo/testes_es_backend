const Joi = require("joi");

const nome = Joi.string().required().messages({
  "any.required": "O campo nome é obrigatório.",
  "string.empty": "O campo nome é obrigatório.",
});
const data_nascimento = Joi.string().required().messages({
  "any.required": "O campo data de nascimento é obrigatório.",
  "string.empty": "O campo data de nascimento é obrigatório.",
});
const telefone = Joi.string().required().messages({
  "any.required": "O campo telefone é obrigatório.",
  "string.empty": "O campo telefone é obrigatório.",
});
const email = Joi.string().required().messages({
  "any.required": "O campo email é obrigatório.",
  "string.empty": "O campo email é obrigatório.",
});
const rg = Joi.string().required().messages({
  "any.required": "O campo rg é obrigatório.",
  "string.empty": "O campo rg é obrigatório.",
});
const estado = Joi.string().required().messages({
  "any.required": "O campo estado é obrigatório.",
  "string.empty": "O campo estado é obrigatório.",
});
const cidade = Joi.string().required().messages({
  "any.required": "O campo cidade é obrigatório.",
  "string.empty": "O campo cidade é obrigatório.",
});
const logradouro = Joi.string().required().messages({
  "any.required": "O campo logradouro é obrigatório.",
  "string.empty": "O campo logradouro é obrigatório.",
});
const numero_endereco = Joi.string().required().messages({
  "any.required": "O campo número é obrigatório.",
  "string.empty": "O campo número é obrigatório.",
});
const bairro = Joi.string().required().messages({
  "any.required": "O campo bairro é obrigatório.",
  "string.empty": "O campo bairro é obrigatório.",
});
const complemento_endereco = Joi.any();

const schemaHospedes = Joi.object({
  nome,
  data_nascimento,
  telefone,
  email,
  rg,
  estado,
  cidade,
  logradouro,
  numero_endereco,
  bairro,
  complemento_endereco,
});

module.exports = schemaHospedes;
