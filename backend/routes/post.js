const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer')

router.post('/new', upload.single('file'), auth, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.put('/:id', auth, postCtrl.updatePost);

module.exports = router;
