const express = require('express');
const chatRouter = express.Router();

chatRouter.use(express.static('public'))

chatRouter.get('/', (req,res) => {
    if(!req.session.user){
        res.redirect('/auth/login')
    }else{
        res.send('this is chat window ')
    }
})

module.exports = chatRouter