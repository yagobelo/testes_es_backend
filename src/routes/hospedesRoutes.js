const router = require("express").Router();

const hospedesControllers = require("../controllers/hospedesControllers");
const valid = require("../middlewares/valid");
const schemaHospedes = require("../middlewares/schemaHospedes");

router.post(
  "/cadastro",
  valid(schemaHospedes),
  hospedesControllers.cadastrarHospedes
);
router.get("/listar", hospedesControllers.listarHospedes);
router.put("/editar/:id", hospedesControllers.editarHospedes);

module.exports = router;
