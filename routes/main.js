const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const indexController = require('../controllers/index')
const talesController = require('../controllers/tales') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

router.get('/', ensureGuest, indexController.getIndex);
router.get('/', ensureAuth, talesController.getTales);
router.get("/getProfile", ensureAuth, talesController.getProfile);

module.exports = router