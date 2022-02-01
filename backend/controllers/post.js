const db = require('../models/index');
const Post = require('../models/post');

exports.createPost = (req, res, next) => {
    db.Post.create({
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl
    })
    .then(() => res.status(201).json("post cree !"))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPost =  (req, res, next) => {
    db.Post.findAll()
    .then((allPost) => res.status(200).end(JSON.stringify(allPost, null, 2)))
    .catch((error) => res.status(500).json({ error }));
};

exports.deletePost = (req, res, next) => {
    db.Post.destroy({
        where: {
         id: req.params.id,
         userId: req.body.userId,
        }
       }).then(count => {
        if (!count) {
         return res.status(404).send({error: 'pas d objet supprime !'});
        }
        res.status(204).send("post supprime !");
    })
    .catch((error) => res.status(403).json({ error }));
};

exports.updatePost = (req, res, next) => {
    db.Post.findOne({
        where:{ 
            id: req.params.id,
            userId: req.body.userId, 
        }
    })
    .then((post) => {
        db.Post.update({post, ...req.body}, {
            where: { 
                id: req.params.id,
                userId: req.body.userId, 
            }
        }).then((count) => {
            if (count[0] === 0) {
                return res.status(404).json({error: 'pas d objet modife  !'});
            }
            res.status(200).json("post modifie !");
        })
        .catch(error => res.status(502).json({ error }));
    })
    .catch(error => res.status(501).json({ error }));
};