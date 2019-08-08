var jwt =  require('jsonwebtoken')
const util = require('util')

const sign = util.promisify(jwt.sign)
const decode = util.promisify(jwt.decode)
const verify = util.promisify(jwt.verify)


exports.generateAccessToken = (payload ) => {

    return sign(payload, process.env.JWT_SECRET_KEY, {expiresIn : process.env.JWT_EXP_TIME})
}

exports.decodeAccessToken = (token ) => {

        return decode(token, {complete: true})
        
}

exports.verifyAccessToken = (token ) => {

     return verify(token,process.env.JWT_SECRET_KEY, {complete: true}, )

      
}
