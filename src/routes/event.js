const router = require('express').Router();
const { create, destroy } = require('../controllers/Event');

const { verifyJWT } = require('../middleware/auth');

router.post('/', verifyJWT, create);
router.delete('/:id', verifyJWT, destroy);

module.exports = router;
