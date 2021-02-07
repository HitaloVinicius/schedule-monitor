const router = require('express').Router();
const { create, destroy } = require('../controllers/Event');

router.post('/', create);
router.delete('/:id', destroy);

module.exports = router;
