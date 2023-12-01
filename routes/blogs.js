const express = require('express')
const router = express.Router()
const blogsController = require('../controllers/blogs') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, blogsController.getLoggedInUserBlogs)
router.post('/createBlog', blogsController.createBlog)
router.delete('/deleteBlog', blogsController.deleteBlog)

module.exports = router