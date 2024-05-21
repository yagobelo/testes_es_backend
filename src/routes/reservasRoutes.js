const router = require("express").Router();

const reservasControllers = require("../controllers/reservasControllers");

router.post("/cadastro", reservasControllers.cadastrarReservas);

module.exports = router;
