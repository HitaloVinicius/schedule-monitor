const router = require('express').Router();
const { create, destroy , update} = require('../controllers/Event');

const { verifyJWT } = require('../middleware/auth');

router.post('/', verifyJWT, create);
router.delete('/:id', verifyJWT, destroy);
router.put('/:id', verifyJWT, update);

module.exports = router;
