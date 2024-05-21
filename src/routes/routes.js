const router = require("express").Router();

const hospedesRoutes = require("./hospedesRoutes");
const reservasRoutes = require("./reservasRoutes");

router.use("/hospedes", hospedesRoutes);
router.use("/reservas", reservasRoutes);

module.exports = router;
