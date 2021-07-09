require('dotenv').config()
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const server = http.createServer(myapp)
const PORT = process.env.PORT || 4000
const authRouter = require('./routes/auth')
const myapp = express()

myapp.use(bodyParser.urlencoded({ extended: true }))
myapp.use(bodyParser.json())

myapp.use(cookieParser());

myapp.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 6000 * 60 * 24
    }
}));

myapp.set('views', './views')
myapp.set('view engine', 'ejs')

myapp.use(express.static('public'))

myapp.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/chat')
    }
    else {
        res.render('login')
    }
})


myapp.get('/chat', (req, res) => {
    if(!req.session.user){
        res.redirect('/login')
    }else{
        res.send('this is chat window')
    }  
})

myapp.use('/auth', authRouter)

server.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})