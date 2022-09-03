const router = require("express").Router();

router.get("/", require("../../controllers/Employer").get);
router.post("/", require("../../controllers/Employer").insert);

module.exports = router;
