const router = require('express').Router();
const { auth } = require('../controllers/Auth');

router.post('/', auth);

module.exports = router;