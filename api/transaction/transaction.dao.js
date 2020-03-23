/* -- Database Access Object --
    Here we write all the function related to database. 
    There should be only one file to access DB per module.
*/

const User = require('./transaction.model'),
    Exception = require('../../lib/model/Exception'),
    jwtHandler = require('../../lib/jwt');
const appUtils = require('../../lib/appUtils')
const bcryptHandler = require('../../lib/bcrypt')


var checkIfEmailExist = (userData) => {
    let regex = new RegExp(userData.email.replace(userData.email, `^${userData.email}$`), 'i')
    let query = { email: { '$regex': regex } }
    return User.findOne(query).then((result) => {
        if (result) { return true; }
        else { return false; }
    }).catch((error) => {
        throw error
    })
}

userAction = (userData) => {
  return User.findByIdAndUpdate(userData.id, {isActive: userData.value}, {new: true})
}


var userLogin = (userData) => {
    //email Auth
    let regex = new RegExp(userData.email.replace(userData.email, `^${userData.email}$`), 'i')
    let query = { email: { '$regex': regex } }
    return User.findOne(query).then((user) => {
        if (user) {

            //Password Auth
            let password  = bcryptHandler.comparePassword(userData.password, user.password)
            if(password) {

                if (user.isActive === false) {
                    throw new Exception(3, "You have been blocked by Admin", null , 403)
                }

                    let payload = {
                        _id: user._id,
                        email: user.email,
                        accountType: user.accountType
                    }

                    return jwtHandler.generateAccessToken(payload).then((result) => {
                        return { accessToken: result, name: user.name, email:user.email, profilePicture: user.profilePicture, accountType: user.accountType }
                    })
            }

            else {
                throw new Exception(2, "Password does not match",null, 401);
            }
        }
        else {
            throw new Exception(1, "No user found on this email");
        }

    }).catch((error) => {
        throw error;
    })
}


var createUser = (userData) => {
    return checkIfEmailExist(userData).then( async (result) => {
        if (result) {
            throw new Exception(1, "This email already exist", null, 401);
        }
        userData.password = await bcryptHandler.encryptPassword(userData.password)
        return User.create(userData)
    })

}

var verifyUserPayloadId  = (userData) => {

    return User.findById(userData._id)
}

var usersList = (userData) => {
let query = {accountType: 'employee'}

if(userData.searchKey){
    query.$or = [{ name: { '$regex': userData.searchKey, '$options': '-i' } }, { email: { '$regex': userData.searchKey, '$options': '-i' } }] 
}

    return User.find(query).skip((userData.pageNo - 1) * userData.limit).limit(userData.limit).sort({createdAt:-1}).select('id name email phone address isActive profilePicture').then((users) => {

       return userCount().then((count) => {
         return {users: users, totalRecords: count}
       }) 
    })
}


var userDetails = (userData) => {
    return User.findById(userData.id).select('name email phone address profilePicture')
}

var editUserAdmin =  (userData) => {
    let { name, password,email ,phone,address , profilePicture, id }= userData

    let set = {}

    let udpate = {'$set': set}
    let options = {new: true, select: {name:1, email:1,phone:1,city:1, address:1 ,profilePicture:1}}

    if(name)
    set.name = name

    if(password) 
        set.password =  bcryptHandler.encryptPassword(password)

    if(email)
    set.email = email

    if(phone)
    set.phone = phone

    if(address)
    set.address = address

    if(profilePicture)
    set.profilePicture = profilePicture

    return User.findByIdAndUpdate(id, udpate,options )
}

var editUser = (userData) => {
    let { name,email ,phone,address , profilePicture, _id }= userData

    let set = {}

    let udpate = {'$set': set}
    let options = {new: true, select: {name:1, email:1,phone:1,city:1, address:1 ,profilePicture:1}}

    if(name)
    set.name = name

    if(phone)
    set.phone = phone

    if(address)
    set.address = address

    if(profilePicture)
    set.profilePicture = profilePicture

    return User.findByIdAndUpdate(_id, udpate,options )
}

var userCount = () => {
    return User.count({accountType: 'employee'})
}
 module.exports = {
    createUser, 
    userLogin,
    verifyUserPayloadId,
    userAction,
    usersList,
    userDetails,
    editUser,
    editUserAdmin

}