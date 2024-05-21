const router = require("express").Router();

const reservasControllers = require("../controllers/reservasControllers");

router.post("/cadastro", reservasControllers.cadastrarReservas);
router.get("/listar", reservasControllers.listarReservas);
router.get("/buscar/:id", reservasControllers.buscarReserva);

module.exports = router;
