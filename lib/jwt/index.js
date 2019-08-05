var jwt =  require('jsonwebtoken')
const util = require('util')

const sign = util.promisify(jwt.sign)
// const decode = util.promisify(jwt.decode)
// const verify = util.promisify(jwt.verify)


exports.generateAccessToken = (payload ) => {

    return sign(payload, process.env.JWT_SECRET_KEY, {expiresIn : process.env.JWT_EXP_TIME})
}

exports.decodeAccessToken = (token ) => {

    return new Promise ( (resolve, reject) => {

        var decodedPayload = jwt.decode(token, {complete: true})

        if(decodedPayload) 
            resolve( decodedPayload)
         else
            reject("Invalid token")
       }) 
}

exports.verifyAccessToken = (token ) => {
    return new Promise ( (resolve, reject) => {

        var verifiedPayload = jwt.verify(token,process.env.JWT_SECRET_KEY, {complete: true}, )

        if(verifiedPayload) 
            resolve( verifiedPayload)
         else
            reject("Invalid code")
       }) 

}
