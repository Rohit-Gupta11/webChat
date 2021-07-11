const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const localStorage = require('node-localStorage');
const authRouter = express.Router();
const saltRounds = 10;

authRouter.use(express.static('public'))

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String
});

const userModel = mongoose.model('webchat-user', userSchema);

authRouter.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/chat')
    }
    else {
        res.render('login')
    }
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    await userModel.findOne({ email: email }, (err, result) => {

        if (err) {
            res.send({ err: err });
        }

        if (result) {
            bcrypt.compare(password, result.password, (err, response) => {
                if (response) {
                    req.session.user = result;
                    res.redirect('/chat')
                } else {
                    res.json({ message: "Wrong username/password combination" });
                }
            });
        } else {
            res.json({ message: "Username doesn't exist" });
        }
    });
})

authRouter.get('/register', (req, res) => {
    if (req.session.user) {
        res.redirect('/chat')
    }
    else {
        res.render('register')
    }
})

authRouter.post('/register', async (req, res) => {
    const { fullname, email, password } = req.body;

    let exUser = await userModel.findOne({ email: email });
    if (exUser) {
        res.json({
            message: "User already exist"
        })
    } else {

        bcrypt.hash(password, saltRounds, async (err, hash) => {

            if (err) {
                console.log(err);
            }

            await userModel.create({
                fullname: fullname,
                email: email,
                password: hash
            }, (err, result) => {
                req.session.user = result;
                res.redirect('/chat')
            });

        });

    }
})

authRouter.delete('/logout', (req, res) => {
    req.session.user = null
    res.sendStatus(200)
})

module.exports = authRouter