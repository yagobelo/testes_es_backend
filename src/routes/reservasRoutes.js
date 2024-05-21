const router = require("express").Router();

const reservasControllers = require("../controllers/reservasControllers");

router.post("/cadastro", reservasControllers.cadastrarReservas);
router.get("/listar", reservasControllers.listarReservas);

module.exports = router;
