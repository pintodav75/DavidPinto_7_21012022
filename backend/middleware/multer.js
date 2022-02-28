const multer  = require('multer')

var storage = multer.diskStorage({
    destination: __dirname + '/../images/',
    filename: function (req, file, cb) {
        const name = file.originalname.split(' ').join('_');
        cb(null, Date.now() + name);
    }
});

module.exports = multer({storage: storage});
