let router = require('express').Router()
let U = require('../config/utils')
let auth = require('./../middleware/auth')


router.use(auth)

router.get('/',(req,res)=>{
    return res.status(200).send({user:req.user})
})

router.get('/deconnect',require('../controller/user.controller').deconnect)

module.exports = router