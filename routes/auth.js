const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const session = require('express-session');
const authRouter = express.Router();
const saltRounds = 10;

authRouter.use(express.static('public'))

let userList = [
]

authRouter.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/chat')
    }
    else {
        res.render('login')
    }
})

authRouter.post('/login', (req, res) => {
    const { email, password } = req.body
    let user = null
    for(let i = 0; i < userList.length; i++){
        if(userList[i].email == email){
            user = userList[i]
            break;
        }
    }
    if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
            if (response) {
                req.session.user = user;
                res.json({
                    message: "user logined"
                });
                res.redirect('/chat')
            } else {
                res.json({ message: "Wrong username/password combination" });
            }
        })
    }
    else
    {
        res.json({message: 'user does not exist '})
    }
})

authRouter.get('/register', (req, res) => {
    if (req.session.user) {
        res.redirect('/chat')
    }
    else {
        res.render('register')
    }
})

authRouter.post('/register', (req, res) => {
    const { fullname, email, password } = req.body;

    let userSearch = null
    
    for(let i = 0; i < userList.length; i++){
        if(userList[i].email == email){
            userSearch = userList[i]
            break;
        }
    }
    
    if (userSearch) {
        res.json({ message: 'user already exist' })
    }
    else {
        bcrypt.hash(password, saltRounds, (err, hash) => {

            if (err) {
                console.log(err);
            }
            else {
                let newUser = {
                    fullname: fullname,
                    email: email,
                    password: hash
                }
                userList.push(newUser)
                req.session.user = newUser
                res.redirect('/chat')
            }
        })
    }
})

module.exports = authRouter