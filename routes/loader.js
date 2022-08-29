const router = require('express').Router();


router.use('/tasks', require('./task/crud'));


module.exports = router;