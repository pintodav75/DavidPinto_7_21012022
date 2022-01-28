const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const db = require('../models/index');

exports.signup =  (req, res, next) => {
    
        db.User.findOne({
        attributes: ['email'],
        where: { email: req.body.email }
    }) 
        .then((user) => {
            if (!user) {
    bcrypt.hash(req.body.password, 10)
        .then(hash => { 
            console.log(hash)           
             const signUser = db.User.create({
                email: req.body.email, 
                password : hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            })
                .then((user) => {
                    console.log(user) 
                    res.status(201).json({ message: 'Utilisateur créé !' })
                });
        })
                .catch(error => res.status(400).json({ error }));
        }})
        
        .catch(error => res.status(500).json({ 'error': 'Utilisateur existant' }));
};