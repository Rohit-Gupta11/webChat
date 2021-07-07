require('dotenv').config()
const express = require('express')
const myapp = express()
const http = require('http')
const server = http.createServer(myapp)
const PORT = process.env.PORT || 4000

myapp.get('/', (req,res) => {
    res.send('hello world ')
})
server.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})