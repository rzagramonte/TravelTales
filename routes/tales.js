const express = require('express')
const router = express.Router()
const talesController = require('../controllers/tales') 
const { ensureAuth } = require('../middleware/auth')

router.get("/:id", ensureAuth, talesController.getTale);
router.post('/createPost', talesController.createTale);
router.post('/addComment', talesController.addComment);
router.put('/editTale/:id', talesController.editTale);
router.put('/markLike/:id', talesController.markLike);
router.delete('/deletePost/:id', talesController.deletePost);

module.exports = router;