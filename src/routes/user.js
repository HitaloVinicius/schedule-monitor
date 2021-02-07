const router = require('express').Router();
const { create } = require('../controllers/Users');

router.post('/', create);

module.exports = router;