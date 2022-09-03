const router = require("express").Router();

router.get("/", require("../../controllers/Role").get);
router.post("/", require("../../controllers/Role").insert);

module.exports = router;
