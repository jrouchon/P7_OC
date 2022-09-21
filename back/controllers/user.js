const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const tk = process.env.RD_TOKEN;

//hash du mdp et sauvegarde en bdd du mdp hashé, du nom et de l'email
exports.signupUser = (req, res) => {
    //console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save()
            .then(() => {
                const token = jwt.sign(
                    { userId: user._id },
                    tk,
                    { expiresIn: '24h'}
                )
                res.setHeader("Authorization", "Bearer" + token);
                res.status(201).json({
                    userId: user._id,
                    token: token
                })
            })
            .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
};

//comparatif de l'email de la req avec les emails en bdd, puis comparatif des mdp et création du token d'identification
exports.loginUser = (req, res) => { 
    //console.log(req.body);
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'login ou mot de passe invalide' })
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: 'login ou mot de passe invalide' })
                        } else {
                            const token = jwt.sign(
                                { userId: user._id },
                                tk,
                                { expiresIn: '24h'}
                            )
                            res.setHeader("Authorization", "Bearer" + token);
                            res.status(200).json({
                                userId: user._id,
                                token: token,
                                name: user.name,
                                role: user.role
                            })
                        }
                    })
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }));
}

exports.logoutUser = (req, res) => {
    res.setHeader("Authorization", "Bearer" + " ");
    res.redirect(200, '/')
}