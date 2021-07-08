require('dotenv').config()
const express = require('express')
const myapp = express()
const http = require('http')
const server = http.createServer(myapp)
const PORT = process.env.PORT || 4000


myapp.set('views', './views') 
myapp.set('view engine', 'ejs')

myapp.use(express.static('public'))

myapp.get('/', (req,res) => {
    res.render('login')
})

myapp.get('/login', (req,res) => {
    res.render('login')
})

myapp.post('/login', (req,res) => {
    res.send('done')
})

myapp.get('/register', (req,res) => {
    res.render('register')
})

myapp.post('/register', (req,res) => {
    res.send('registering')
})

server.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})