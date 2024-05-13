const router = require("express").Router();

const hospedesControllers = require("../controllers/hospedesControllers");

router.post("/cadastro", hospedesControllers.cadastrarHospedes);
router.get("/listar", hospedesControllers.listarHospedes);

module.exports = router;
