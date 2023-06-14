//  import mongoose in userschema.js file

const mongoose = require('mongoose')
 
// define schema for users
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    acno:{
        type:Number,
        required:true,
        unique:true
    },
    balance:{
        type:Number,
        required:true
    },
    transactions:{
        type:Array,
        required:true
    }
})

// create a model to store the documents

const users= mongoose.model("users",userSchema)


// export model

module.exports = users