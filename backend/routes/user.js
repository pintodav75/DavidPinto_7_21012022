const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer')


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id',  userCtrl.getOneUser);
router.delete('/:id', userCtrl.deleteUser);
router.put('/:id', upload.single('file'), userCtrl.modifyUser);

module.exports = router;