const router = require('express').Router();
const { index, filter, create, destroy } = require('../controllers/Users');

router.get('/', index);
router.get('/:id', filter);
router.post('/', create);
router.delete('/:id',destroy );

module.exports = router;