const router = require('express').Router();

router.get('/', require('../../controllers/Task').get);
router.post('/', require('../../controllers/Task').insert);


module.exports = router;