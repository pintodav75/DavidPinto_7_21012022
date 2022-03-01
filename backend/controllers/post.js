const db = require('../models/index');

exports.createPost = (req, res, next) => {
    if (!req.body.title || !req.body.content ) {
        return res.status(400).json("error");
    }
    db.Post.create({
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    .then(() => res.status(201).json("post cree !"))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPost =  (req, res, next) => {
    db.Post.findAll({
        include: [{ model: db.Users }]
    })
    .then((allPost) => res.status(200).end(JSON.stringify(allPost, null, 2)))
    .catch((error) => res.status(500).json({ error }));
};

exports.deletePost = (req, res, next) => {
    let conds = {}
    
    if (req.body.isAdmin != true) {
        conds = {  userId: req.body.userId }
    }

    db.Post.destroy({
        where: {
         id: req.params.id,
         ...conds,
        }
       }).then(count => {
        if (!count) {
         return res.status(404).send({error: 'pas d objet supprime !'});
        }
        res.status(200).send("post supprime !");
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