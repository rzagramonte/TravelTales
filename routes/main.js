const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const postsController = require('../controllers/posts') 
const { ensureAuth } = require('../middleware/auth')

router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

router.get('/', homeController.getHome);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/getProfile", ensureAuth, postsController.getProfile);

module.exports = router