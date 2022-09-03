const router = require("express").Router();

router.use("/tasks", require("./task/crud"));
router.use("/roles", require("./role/crud"));
router.use("/employers", require("./employer/crud"));

module.exports = router;
