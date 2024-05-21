const router = require("express").Router();

const reservasControllers = require("../controllers/reservasControllers");

router.post("/cadastro", reservasControllers.cadastrarReservas);
router.get("/listar", reservasControllers.listarReservas);
router.get("/buscar/:id", reservasControllers.buscarReserva);
router.put("/editar/:id", reservasControllers.editarReserva);

module.exports = router;
