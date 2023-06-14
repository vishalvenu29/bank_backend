// import

require('dotenv').config()

// import express
const express = require('express')
// import cors
const cors = require('cors')

// import db
require('./db/connection')

// import router
const router = require('./Routes/router')

// import appmiddleware
const middleware = require('./Middleware/appMIddleware')

// create express server
const server = express()

// set portno for server
const PORT = 3000 || process.env.PORT

// use cors,json.parser
server.use(cors())
server.use(express.json())

// use appmiddleware
server.use(middleware.appMiddleware)

// use router in server app
server.use(router)



// to resolve http request using express server

server.get('/',(req,res)=>{
    res.send(" <h1> Bank Server Started !!!</h1>")
})



// run the server app in a specified port

server.listen(PORT,()=>{

    console.log(`Bank server started at port number ${PORT}`);
})