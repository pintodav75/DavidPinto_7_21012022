const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const db = require('../models/index');


exports.signup = (req, res, next) => {
    db.User.findOne({
        attributes: ['email'],
        where: { email: req.body.email }
    })
    .then((user) => {
        if (!user) {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                        db.User.create({
                        email: req.body.email,
                        password: hash,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                    })
                    .then((user) => {
                        console.log(req.)
                        res.status(201).json({ message: 'Utilisateur créé !' })
                    })
                    .catch((err) => res.status(400).json({ err }))
                })
                .catch(error => res.status(400).json({ error }));
        } else
            res.status(403).json({ message: 'Utilisateur already exists !' })
    })
    .catch( error => res.status(500).json({ error }));
    
};

exports.login = (req, res, next) => {
    db.User.findOne({
        where: { email: req.body.email}
    })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'utilisateur non trouve !' });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'mot de passe incorrect !' })
            }
            res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                    { userId: user.id },
                    'RANDOM_SECRET_TOKEN',
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};