const responseHandler = require('../../lib/responseHandler');
const userDoa = require('./userDao');



exports.createUser = (request, response) => {
    let { name, email, password, phone, address } = request.body
    // let file = request.file

    // if(file)
    // var profilePicture = `/images/users/${file.filename}`

    userDoa.createUser({ name, email, password, phone, address }).then((result) => {
        responseHandler.sendSuccess(response, {  
            userId: result._id,
            name: result.name,
            email: result.email,
            phone: result.phone,
            address: result.address,
            profilePicture: result.profilePicture
            // accountType: result.accountType
        },"User created successfully")
    }).catch((error) => {

        responseHandler.sendError(response, error)
    })

}



exports.userLogin = (request, response) => {
    let {email, password} = request.body
    userDoa.userLogin({email, password}).then((result) => {
        responseHandler.sendSuccess(response, result,  "Login successfully !")

    }).catch((error) => {
        console.log(error)
        responseHandler.sendError(response, error)
    })
       
  }   

  exports.userDetails = (request, response) => {
    let {id} = request.params
    userDoa.userDetails({id}).then((result) => {
        responseHandler.sendSuccess(response, result, result === {} ?  "No record found": "Record found successfully")

    }).catch((error) => {
        console.log(error)
        responseHandler.sendError(response, error)
    })
       
  }  

exports.userAction = (request, response) => {
    let {id, value} = request.params

    userDoa.userAction({id, value}).then((result) => {
        if(result.isActive=== true) {
            responseHandler.sendSuccess(response, {}, "User active successfully")
        }
        else {
            responseHandler.sendSuccess(response, {}, "User inactive successfully")
        }
    }).catch((error) => {
        responseHandler.sendError(response, error)
    })
}

exports.usersList = ( request, response) => {
    let {pageNo, limit} = request.params;
    let {searchKey} = request.query

    pageNo = Number(pageNo);
    limit  = Number(limit)

    userDoa.usersList({pageNo, limit,searchKey}).then((result) => {

        responseHandler.sendSuccess(response, result, result.users.length ? "Records found successfully !": "No records found !")

    }).catch((error) => {
     responseHandler.sendError(response, error)
    })
}

exports.editUser = (request, response) => {
    let {_id} = request.user
  let { name,email ,phone  ,address}= request.body
  let file = request.file

    if(file)
    var profilePicture = `/images/users/${file.filename}`

    userDoa.editUser({name,email ,phone, address , profilePicture, _id }).then((result) => {

        responseHandler.sendSuccess(response, result, result ? "Record updated successfully !": "No record updated !")

    }).catch((error) => {
     responseHandler.sendError(response, error)
    })
}

exports.editUserAdmin = (request, response) => {
    let {id} = request.params
  let { name, password,email ,phone  ,address}= request.body
  let file = request.file

    if(file)
    var profilePicture = `/images/users/${file.filename}`

    userDoa.editUserAdmin({name, password,email ,phone, address , profilePicture, id }).then((result) => {

        responseHandler.sendSuccess(response, result, result ? "Record updated successfully !": "No record updated !")

    }).catch((error) => {
     responseHandler.sendError(response, error)
    })

}