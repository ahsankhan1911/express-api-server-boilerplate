
const appUtils = require('../../lib/appUtils'),
_ = require('lodash'),
userDao = require('./userDao'),
customException = require('../../lib/customException'),
Exception = require('../../lib/model/Exception'),
jwtHandler  =require('../../lib/jwt'),

constant = require('../../lib/constant');
const {uploadForUser} = require('../../lib/multer')




var uploadUserProfilePicture =   uploadForUser.single('file')


var validateUserCreate = function(request, response, next){
let {name, email , password} = request.body;
var errors = [];

if(_.isEmpty(name)){
  errors.push({fieldName:'name', message:"Please enter name"});
}
email = _.toLower(email);
if(_.isEmpty(email)){
  errors.push({fieldName:'email', message:"Please enter email"});
}
if(!appUtils.isValidEmail(email)){
  errors.push({fieldName:'email', message:"Please provide a valid email"});
}
if(_.isEmpty(password)){
  errors.push({fieldName:'password', message:"Please enter password"});
}

if(errors && errors.length > 0){
  validationError(errors, next);
}
next();
}



var validateUserLogin = function(request, response, next){
  let {email , password} = request.body;
  var errors = [];
  
  email = _.toLower(email);
  if(_.isEmpty(email)){
    errors.push({fieldName:'email', message:"Please enter email"});
  }
  if(!appUtils.isValidEmail(email)){
    errors.push({fieldName:'email', message:"Please provide a valid email"});
  }
  if(_.isEmpty(password)){
    errors.push({fieldName:'password', message:"Please enter password"});
  }
  
  if(errors && errors.length > 0){
    validationError(errors, next);
  }
  next();

  
  }


var validateUserList = function(request, response, next){
    let {pageNo , limit} = request.params;
    var errors = [];
    
    if(_.isEmpty(pageNo)){
      errors.push({fieldName:'pageNo', message:"Please provide  pageNo"});
    }
   
    if(_.isEmpty(limit)){
      errors.push({fieldName:'limit', message:"Please provide limit"});
    }
    
    if(errors && errors.length > 0){
      validationError(errors, next);
    }
    next();
  
    
}
  

var authenticateAdminAccesstoken = (request, response,next) => {
  let accessToken = request.get('Authorization')
  if(accessToken) {
    jwtHandler.verifyAccessToken(accessToken).then((result) => {
      return  userDao.verifyUserPayloadId(result.payload).then((user) => {
        if(user) {
            if(user.accountType !== 'admin') {
                return next(new Exception(2, constant.MESSAGES.UNAUTHORIZED_ACCESS, null, 401));
            }
          request.user =  user
           return next()
        }
        else {
          return next(new Exception(2, "No user found on this token", null, 401));
        }
      })
        
       
    })
    .catch((err) => {
                switch(err.message) {
            case "jwt expired":
            // response.status(401)
            return next(new Exception(2, constant.MESSAGES.UNAUTHORIZED_ACCESS, null, 401));
      
            case "invalid token": 
            // response.status(403)
            return	next(new Exception(3, constant.MESSAGES.ACCESS_FORBIDDEN, null, 403));
          
          case "invalid signature": 
          // response.status(403)
            return	next(new Exception(4, constant.MESSAGES.ACCESS_FORBIDDEN, null, 403));
      
          default:
          // response.status(400)
             return	next( new Exception(5, constant.MESSAGES.SOMETHING_WENT_WRONG, null, 400));
           }
    })
  }
  else {
    // response.status(401)
    return next( new Exception(1, "No access token provided !",null, 401) );
  }

}

var authenticateAccesstoken = (request, response,next) => {
  let accessToken = request.get('Authorization')
  if(accessToken) {
    jwtHandler.verifyAccessToken(accessToken).then((result) => {
      return  userDao.verifyUserPayloadId(result.payload).then((user) => {
        if(user) {
          request.user =  user
          next()
        }
        else {
          return next(new Exception(2, "No user found on this token", null, 401));
        }
      })
        
       
    })
    .catch((err) => {
                switch(err.message) {
            case "jwt expired":
            // response.status(401)
            return next(new Exception(2, constant.MESSAGES.UNAUTHORIZED_ACCESS, null, 401));
      
            case "invalid token": 
            // response.status(403)
            return	next(new Exception(3, constant.MESSAGES.ACCESS_FORBIDDEN, null, 403));
          
          case "invalid signature": 
          // response.status(403)
            return	next(new Exception(4, constant.MESSAGES.ACCESS_FORBIDDEN, null, 403));
      
          default:
          // response.status(400)
             return	next( new Exception(5, constant.MESSAGES.SOMETHING_WENT_WRONG, null, 400));
           }
    })
  }
  else {
    // response.status(401)
    return next( new Exception(1, "No access token provided !",null, 401) );
  }

}


var validationError = function(errors, next){
if(errors && errors.length > 0){
  return next(customException.customErrorException(constant.MESSAGES.VALIDATION_ERROR, errors, 400));
}
next();
}

module.exports = {
validateUserCreate,
authenticateAdminAccesstoken,
authenticateAccesstoken,
validateUserLogin,
validateUserList,
uploadUserProfilePicture,
}