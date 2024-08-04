const bcrypt = require('bcrypt')

class Utils{
    static async hash(h,salt = 10){
        let hash = await (new Promise((resolve,reject)=>{
            bcrypt.hash(h, salt, function(err, hash) {
                if(err) reject(err)
                resolve(hash)
            })
        }))
        return hash
    }

    static async compare(c,h){
        let b = await (new Promise((resolve,reject)=>{
            bcrypt.compare(c, h, function(err, result) {
                if(err) reject(err)
                resolve(result)
            });
        }))
        return b
    }
}

module.exports = Utils