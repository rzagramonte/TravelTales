const express = require('express')
const router = express.Router()
const blogsController = require('../controllers/blogs') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, blogsController.getLoggedInUserBlogs)

router.get('/feed', blogsController.getAllBlogs)

router.post('/createBlog', blogsController.createBlog)

router.put('/markLike', blogsController.markLike)

router.put('/markUnlike', blogsController.markUnlike)

router.delete('/deleteBlog', blogsController.deleteBlog)

module.exports = router