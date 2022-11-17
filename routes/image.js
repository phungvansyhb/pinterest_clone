const router = require('express').Router()
const imageControllers = require('../controllers/imageControllers')

router.patch('/edit/:id', imageControllers.reviews)
router.get('/:id', imageControllers.getRelatedImages)

module.exports = router;
