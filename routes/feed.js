const express = require('express')
const router = express.Router()
const feedController = require('../controllers/feed') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, feedController.getAllBlogs)
router.put('/markLike', feedController.markLike)

module.exports = router