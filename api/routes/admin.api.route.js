let router = require('express').Router()
let auth = require('./../middleware/auth')


router.use(auth)

router.use((req,res,next)=>{
    if(!req.user || req.user.uti_role != "admin"){
        return res.status(403).send({error:"Accès réfusé"})
    }else{
        next()
    }
})

router.post('/user',require('../controller/user.controller').createUser)

module.exports = router