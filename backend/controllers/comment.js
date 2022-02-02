const db = require('../models/index');
const Comment = require('../models/comment');


exports.createComment = (req, res, next) => {
    db.Post.findOne({
        where: { id: req.params.postId }
    })
    .then(count => {
        if (count) {
            db.Comment.create({
               userId: req.body.userId,
               postId: req.params.postId,
               content: req.body.content
            })
            .then(() => res.status(201).json("commentaire cree !"))
            .catch((error) => res.status(400).json({ error }));
        }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllComment = (req, res, next) => {
    db.Comment.findAll({
        where: { postId: req.params.postId }
    })
    .then(allComment => {
        if(allComment) {
            res.status(200).json(allComment);
            console.log(allComment);
        }
        else {
           res.status(404).json({ error: 'aucun commentaire trouve !'}) 
        }
    })
    .catch((error) => res.status(500).json({ error }));
};