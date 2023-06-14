// import express
const  express = require('express')

// import middleware
const middleware = require('../Middleware/routerSpecific')

// create routes using express.Router

const router = new express.Router()

// define routes to resolve request


// import controller
const userController = require('../conrollers/userController')

// register rqst

router.post('/employee/register',userController.register)

// login rqst
router.post('/employee/login',userController.login)

// balance get reqst
router.get('/user/balance/:acno',middleware.logMiddleware,userController.getbalance)

// fund transfer
router.post('/user/transfer',middleware.logMiddleware,userController.fundtransfer)

// statement
router.get('/user/statement',middleware.logMiddleware,userController.getTransactions)

// delete account
router.delete('/user/delete',middleware.logMiddleware,userController.deleteAccount)

// export router
module.exports = router