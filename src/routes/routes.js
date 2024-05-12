const router = require("express").Router();

const hospedesRoutes = require("./hospedesRoutes");

router.use("/hospedes", hospedesRoutes);

module.exports = router;
