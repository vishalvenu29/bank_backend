// import model in userController

const users = require('../Models/userSchema')

// import jsonwebtoken
const jwt = require('jsonwebtoken')

// deine and export logic to resolve different http request

// register
exports.register = async (req,res)=>{
//    register logic
console.log(req.body);

// get data send by front end
const{username,acno,password} = req.body

if(!username || !acno || !password){
    res.status(403).json("All inputs are required")
}


// check user is existing

try{
    const preuser = await users.findOne({acno})
    if (preuser){
        res.status(406).json("User already exists")
    }

    else{
        // add user to db
        const newuser = new users({
            username,
            password,
            acno,
            balance:5000,
            transactions:[]
        })
        // to save new userin mongodb
        await newuser.save()
        res.status(200).json(newuser)
    }
} 
catch(error){
    res.status(401).json(error)
}


}

// login
exports.login = async(req,res)=>{
    // get req body
    const {acno,password}=req.body
    try{
        // check acno and password is in database
        const preuser = await users.findOne({acno,password})
        // check preuser or not
        if (preuser){
            // generate token 
            const token = jwt.sign({
                loginAcno:acno
            },"secretkey12345")

            res.status(200).json({preuser,token})
                }
                else{
                    res.status(404).json("Invalid account no / password")
                }
                
    }
    catch(error){
             res.status(401).json (error)      
    }

}

// getbalance
exports.getbalance = async(req,res)=>{
    // get acno from path parameter
    let acno=req.params.acno


    // get data of given acno
    try{
        const preuser = await users.findOne({acno})
        if(preuser){
            res.status(200).json(preuser.balance)
        }
        else{
            res.status(404).json("Invalid account no")
        }

    }
    catch(error){
        res.status(401).json(error)
    }
}


// fundtransfer
exports.fundtransfer = async(req,res)=>{
    console.log("Inside transfer logic");
     // get body from req,creditacno,amount,pswd
    const {creditAcno,creditAmount,pswd} = req.body
    let amt = Number(creditAmount)
    const {debitAcno} = req
    console.log(debitAcno);

    // check debitacno and pswd is available in mongodb
 try {
      const debitUserDetails = await users.findOne({acno:debitAcno,password:pswd})
   console.log(debitUserDetails);

//    get credit acno details from mongdb
   const creditUserDetails = await users.findOne({acno:creditAcno})
    console.log(creditUserDetails);

  if(debitAcno!=creditAcno){
    if(debitUserDetails && creditUserDetails){

        // check sufficient balance available for debituserdetails
        if(debitUserDetails.balance>=creditAmount){

            // perform transfer
            // debit creditamnt from debituserdetails
            debitUserDetails.balance -= amt

            // add debit transaction to the debituserDetails
            debitUserDetails.transactions.push({
                transaction_type:"DEBIT",amount:creditAmount,fromAcno:debitAcno,toAcno:creditAcno
            })

            // save debituserdetails in mongodb
            await debitUserDetails.save()


            // credit creditamount to credituserdetails
            creditUserDetails.balance+= amt 

            // add credit transsction to credituserdetails

            creditUserDetails.transactions.push({
                transaction_type:"CREDIT",amount:creditAmount,fromAcno:debitAcno,toAcno:creditAcno
            })

            // save credituserDetails in mongodb
            await creditUserDetails.save()
            res.status(200).json("Fund transfer sucessfully completed...")
        }
        else{
            // insufficient
            res.status(406).json("Insufficient balance!!")
        }

    }
    else{
        res.status(406).json("Invalid credit/debit details")
    }
  }
  else{
    res.status(406).json("operation denied!!! self transaction not possible")
  }
}

catch(error){
    res.status(401).json(error)
}
  
}

// get transactions
exports.getTransactions = async (req,res)=>{
    // get acno from req.debitAcno
    let acno = req.debitAcno

    // check accno is in mongodb or not
    try{
        const preuser = await users.findOne({acno})
        res.status(200).json(preuser.transactions)

    }
    catch(error){
        res.status(401).json("Invalid acno")

    }
}

// delete account
exports.deleteAccount = async(req,res)=>{
    // get acno from req
    let delAccno = req.debitAcno


    // delete acno from mongodb
    try{
         await users.deleteOne({delAccno})
        res.status(200).json("Removed successfully")

    }
    catch(error){
        res.status(401).json(error)
    }
}
