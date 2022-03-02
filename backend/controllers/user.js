const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
require('dotenv').config();

exports.signup = (req, res, next) => {
    db.Users.findOne({
        attributes: ['email', 'password', 'firstName', 'lastName'],
        where: { email: req.body.email }
    })
    .then((user) => {
        if (!user) {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    db.Users.create({
                        email: req.body.email,
                        password: hash,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                    })
                    .then((user) => {
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
    db.Users.findOne({
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
                    { userId: user.id, isAdmin: user.isAdmin },
                    process.env.SECRET_TOKEN ,
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    db.Users.findOne({
        where: { id: req.params.id }
    })
    .then((user) => res.status(200).json({ user }))
    .catch(error => res.status(404).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    db.Users.destroy({
        where: { id: req.params.id }
    })
    .then(() => res.status(200).json({ message: 'utilisateur supprime !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyUser = (req, res, next) => {
    let userObject = {
        ...req.body,
    };
    if (req.file)
        userObject.imageUrl = req.file.filename
    db.Users.findOne({
        where: { id: req.params.id }
    })
    .then(() => {
        db.Users.update(userObject, {
            where: { id: req.params.id }
        })
        .then(() => res.status(200).json({ message: 'utilisateur modifie !' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
};
