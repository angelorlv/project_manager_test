const jwt = require("jsonwebtoken");
require('dotenv').config()

const config = process.env;

const verifyToken = async (req, res, next) => {
    let token = req.cookies['x-access-token']
    
    if (!token) {
        return res.status(401).send({error:"Token non valide"})
    }else{
        try {
            const decoded = jwt.verify(token, config.TOKEN_KEY)
            req.user = decoded
            return next()
        } catch (err) {
            return res.status(401).send({status:false})
        }
    }
    
};

module.exports = verifyToken