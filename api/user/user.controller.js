/* -- API Controller Functions --
    Getting the data from middlewares and providing it to DAOs and handlings responses is done by Controllers
*/

const responseHandler = require('../../lib/responseHandler');
const userDoa = require('./user.dao');

exports.registerUser = (request, response) => {
    let { username,email,fullname,phone,password, braintree_client_token, roles} = request.body

    userDoa.createUser({ username,email,fullname,phone,password, braintree_client_token, roles}).then((result) => {
        responseHandler.sendSuccess(response, {
            username: result.username,
            email: result.email,
            fullname: result.fullname,
            phone: result.phone,
        }, "User registered successfully")
    }).catch((error) => {

        responseHandler.sendError(response, error)
    })

}

//For Admin
exports.createUser = (request, response) => {
    let { name, email, password, phone, address } = request.body

    userDoa.createUser({ name, email, password, phone, address }).then((result) => {
        responseHandler.sendSuccess(response, {
            _id: result._id,
            name: result.name,
            email: result.email,
            phone: result.phone,
            address: result.address,
        }, "User created successfully")
    }).catch((error) => {

        responseHandler.sendError(response, error)
    })

}

exports.userLogin = (request, response) => {
    let { email, password } = request.body
    userDoa.userLogin({ email, password }).then((result) => {
        responseHandler.sendSuccess(response, result, "Login successfully !")

    }).catch((error) => {
        console.log(error)
        responseHandler.sendError(response, error)
    })

}

exports.userDetails = (request, response) => {
    let { _id } = request.user
    userDoa.userDetails({ _id }).then((result) => {
        responseHandler.sendSuccess(response, result, !result ? "No record found" : "Record found successfully")

    }).catch((error) => {
        console.log(error)
        responseHandler.sendError(response, error)
    })

}

exports.userDetailsAdmin = (request, response) => {
    let { id } = request.params
    userDoa.userDetails({ id }).then((result) => {
        responseHandler.sendSuccess(response, result, !result ? "No record found" : "Record found successfully")

    }).catch((error) => {
        console.log(error)
        responseHandler.sendError(response, error)
    })

}

exports.userAction = (request, response) => {
    let { id, value } = request.params

    userDoa.userAction({ id, value }).then((result) => {
        if (result.isActive === true) {
            responseHandler.sendSuccess(response, {}, "User active successfully")
        }
        else {
            responseHandler.sendSuccess(response, {}, "User inactive successfully")
        }
    }).catch((error) => {
        responseHandler.sendError(response, error)
    })
}

exports.usersList = (request, response) => {
    let { pageNo, limit } = request.params;
    let { searchKey } = request.query

    pageNo = Number(pageNo);
    limit = Number(limit)

    userDoa.usersList({ pageNo, limit, searchKey }).then((result) => {

        responseHandler.sendSuccess(response, result, result.users.length ? "Records found successfully !" : "No records found !")

    }).catch((error) => {
        responseHandler.sendError(response, error)
    })
}

exports.updateUser = (request, response) => {
    let { _id } = request.user
    let { fullname, phone, business_details,bank_details, description } = request.body

    userDoa.updateUser({_id,  fullname, phone, business_details,bank_details, description}).then((result) => {

        responseHandler.sendSuccess(response, result, result ? "Record updated successfully !" : "No record updated !")

    }).catch((error) => {
        responseHandler.sendError(response, error)
    })
}

exports.editUserAdmin = (request, response) => {
    let { id } = request.params
    let { name, password, email, phone, address } = request.body
    let file = request.file

    if (file)
        var profilePicture = `/images/users/${file.filename}`

    userDoa.editUserAdmin({ name, password, email, phone, address, profilePicture, id }).then((result) => {

        responseHandler.sendSuccess(response, result, result ? "Record updated successfully !" : "No record updated !")

    }).catch((error) => {
        responseHandler.sendError(response, error)
    })

}