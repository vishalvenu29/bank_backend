// router specific middleware

// import json webtoken
const jwt = require("jsonwebtoken")

// define logic for checking user login or not
const logMiddleware = (req,res,next)=>{
    console.log("Routerspecific middleware");

    // get token
    const token = req.headers['access-token']
    try{
    // verify token
    const {loginAcno} = jwt.verify(token,"secretkey12345")
    console.log(loginAcno);

    // pass loginacno to req
    req.debitAcno = loginAcno

    // to process user request
    next()
    }
    catch{
        res.status(401).json("Please log in")
    }
}

module.exports = {
    logMiddleware
}