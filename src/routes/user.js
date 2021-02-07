const router = require('express').Router();
const { index, filter, create } = require('../controllers/Users');

router.get('/', index);
router.get('/:id', filter);
router.post('/', create);

module.exports = router;