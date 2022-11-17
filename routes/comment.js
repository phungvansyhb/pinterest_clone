const router = require('express').Router()
const commentControllers = require('../controllers/commentControllers')

router.get('/:id', commentControllers.getComments)

module.exports = router;
