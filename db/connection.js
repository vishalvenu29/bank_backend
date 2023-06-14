// define connectivity node app and mongo db database

// import mongoose
const mongoose = require('mongoose')
// to get connection string from .env file usng process env

const connectionString = process.env.Database

// connect node app with mongoose

mongoose.connect(connectionString,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("Atlas connected successfully...");
}).catch((error)=>{
    console.log("Atlas connection error!!!:",error);
})