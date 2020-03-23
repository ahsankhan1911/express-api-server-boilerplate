/* -- API Controller Functions --
    Getting the data from middlewares and providing it to DAOs and handlings responses is done by Controllers
*/

const responseHandler = require('../../lib/responseHandler');
const transactionDoa = require('./transaction.dao');


exports.createtransaction = (request, response) => {
    let { name, email, password, phone, address } = request.body

    transactionDoa.createtransaction({ name, email, password, phone, address }).then((result) => {
        responseHandler.sendSuccess(response, {
            transactionId: result._id,
            name: result.name,
            email: result.email,
            phone: result.phone,
            address: result.address,
            profilePicture: result.profilePicture
        }, "transaction created successfully")
    }).catch((error) => {

        responseHandler.sendError(response, error)
    })

}

exports.transactionLogin = (request, response) => {
    let { email, password } = request.body
    transactionDoa.transactionLogin({ email, password }).then((result) => {
        responseHandler.sendSuccess(response, result, "Login successfully !")

    }).catch((error) => {
        console.log(error)
        responseHandler.sendError(response, error)
    })

}

exports.transactionDetails = (request, response) => {
    let { id } = request.params
    transactionDoa.transactionDetails({ id }).then((result) => {
        responseHandler.sendSuccess(response, result, !result ? "No record found" : "Record found successfully")

    }).catch((error) => {
        console.log(error)
        responseHandler.sendError(response, error)
    })

}

exports.transactionAction = (request, response) => {
    let { id, value } = request.params

    transactionDoa.transactionAction({ id, value }).then((result) => {
        if (result.isActive === true) {
            responseHandler.sendSuccess(response, {}, "transaction active successfully")
        }
        else {
            responseHandler.sendSuccess(response, {}, "transaction inactive successfully")
        }
    }).catch((error) => {
        responseHandler.sendError(response, error)
    })
}

exports.transactionsList = (request, response) => {
    let { pageNo, limit } = request.params;
    let { searchKey } = request.query

    pageNo = Number(pageNo);
    limit = Number(limit)

    transactionDoa.transactionsList({ pageNo, limit, searchKey }).then((result) => {

        responseHandler.sendSuccess(response, result, result.transactions.length ? "Records found successfully !" : "No records found !")

    }).catch((error) => {
        responseHandler.sendError(response, error)
    })
}

exports.edittransaction = (request, response) => {
    let { _id } = request.transaction
    let { name, email, phone, address } = request.body
    let file = request.file

    if (file)
        var profilePicture = `/images/transactions/${file.filename}`

    transactionDoa.edittransaction({ name, email, phone, address, profilePicture, _id }).then((result) => {

        responseHandler.sendSuccess(response, result, result ? "Record updated successfully !" : "No record updated !")

    }).catch((error) => {
        responseHandler.sendError(response, error)
    })
}

exports.edittransactionAdmin = (request, response) => {
    let { id } = request.params
    let { name, password, email, phone, address } = request.body
    let file = request.file

    if (file)
        var profilePicture = `/images/transactions/${file.filename}`

    transactionDoa.edittransactionAdmin({ name, password, email, phone, address, profilePicture, id }).then((result) => {

        responseHandler.sendSuccess(response, result, result ? "Record updated successfully !" : "No record updated !")

    }).catch((error) => {
        responseHandler.sendError(response, error)
    })

}