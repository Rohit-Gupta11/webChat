require('dotenv').config()
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4000
const authRouter = require('./routes/auth')
const chatRouter = require('./routes/chat')
const myapp = express()
const server = http.createServer(myapp)

const {Server} = require('socket.io')
const io = new Server(server)

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

myapp.use('/auth', authRouter)
myapp.use('/chat', chatRouter)

io.on('connection', (socket) => {
    console.log(`user connected and id ${socket.id}`)
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    })
})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('db connected')
})

server.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})