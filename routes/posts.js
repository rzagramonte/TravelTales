const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts') 
const { ensureAuth } = require('../middleware/auth')

router.get("/:id", ensureAuth, postsController.getPost);
router.post('/createPost', postsController.createPost);
router.post('/addComment', postsController.addComment);
router.put('/markLike/:id', postsController.markLike);
router.delete('/deletePost/:id', postsController.deletePost);

module.exports = router