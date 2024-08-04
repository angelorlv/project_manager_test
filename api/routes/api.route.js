let router = require('express').Router()


//api public
router.get('/ad-add',require('../controller/user.controller').createMaster) 
router.post('/auth',require('../controller/user.controller').authUser)

router.use('/admin',require('./admin.api.route'))
router.use('/u',require('./user.api.route'))


//------
module.exports = router