const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/:postId/new', auth, commentCtrl.createComment);
router.get('/:postId', auth, commentCtrl.getAllComment);

module.exports = router;