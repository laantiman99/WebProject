const express = require('express');
const userModel = require('../Models/user')
const body = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post("/Signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 5).then(hash => {
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });
        user.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: "User Created",
                data: result
            });
        }).catch(err => {
            res.status(500).json({
                message: "Server error"
            });
            error: err
        });
    });

});

router.post("/login", (req, res, next) => {
    let fromDbUser;
    userModel.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        fromDbUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        if (!result) {
            return res.status(401).json({
                message: "Authentication Failed"
            });
        }
        const token = jwt.sign({ email: fromDbUser.email, userId: fromDbUser._id }, 'my_token_secret_for_development', { expiresIn: "5h" });
        res.status(200).json({ message: "token assigned", token: token, userId: fromDbUser.name, expiresIn: 18000 })

    }).catch(err => {
        return res.status(401).json({ message: "Authentication Failed" });
        error: err;
    });
});

module.exports = router;