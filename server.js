require('dotenv').config()
const express = require('express')
const myapp = express()
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')
const server = http.createServer(myapp)
const saltRounds = 10
const PORT = process.env.PORT || 4000

myapp.use(bodyParser.urlencoded({ extended: true }))
myapp.use(bodyParser.json())

myapp.use(cors({
    origin: "http://localhost:4000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

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

let userList = [
]

myapp.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/chat')
    }
    else {
        res.render('login')
    }
})

myapp.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/chat')
    }
    else {
        res.render('login')
    }
})

myapp.post('/login', (req, res) => {
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

myapp.get('/register', (req, res) => {
    if (req.session.user) {
        res.redirect('/chat')
    }
    else {
        res.render('register')
    }
})

myapp.post('/register', (req, res) => {
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

myapp.get('/chat', (req, res) => {
    if(!req.session.user){
        res.redirect('/login')
    }else{
        res.send('this is chat window')
    }  
})

server.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})