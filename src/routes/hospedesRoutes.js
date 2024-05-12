const router = require("express").Router();

const hospedesControllers = require("../controllers/hospedesControllers");

router.post("/cadastro", hospedesControllers.cadastrarHospedes);

module.exports = router;
