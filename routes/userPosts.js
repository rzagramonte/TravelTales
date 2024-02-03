const express = require('express')
const router = express.Router()
const postsController = require('../controllers/userPosts') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, postsController.getLoggedInUserPosts)
router.post('/createPost', postsController.createPost)
router.delete('/deletePost', postsController.deletePost)

module.exports = router