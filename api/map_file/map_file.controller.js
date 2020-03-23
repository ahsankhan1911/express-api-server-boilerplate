/* -- API Controller Functions --
    Getting the data from middlewares and providing it to DAOs and handlings responses is done by Controllers
*/

const responseHandler = require('../../lib/responseHandler');
const mapfileDoa = require('./map_file.dao');


exports.createMapFile = (request, response) => {
    let { name, email, password, phone, address } = request.body

    mapfileDoa.createmapfile({ name, email, password, phone, address }).then((result) => {
        responseHandler.sendSuccess(response, {
            mapfileId: result._id,
            name: result.name,
            email: result.email,
            phone: result.phone,
            address: result.address,
            profilePicture: result.profilePicture
        }, "mapfile created successfully")
    }).catch((error) => {

        responseHandler.sendError(response, error)
    })

}

exports.mapFileDetails = (request, response) => {
    let { id } = request.params
    mapfileDoa.mapfileDetails({ id }).then((result) => {
        responseHandler.sendSuccess(response, result, !result ? "No record found" : "Record found successfully")

    }).catch((error) => {
        console.log(error)
        responseHandler.sendError(response, error)
    })

}

exports.mapFileDelete = (request, response) => {
    let { id } = request.params
    mapfileDoa.mapFileDelete({ id }).then((result) => {
        responseHandler.sendSuccess(response, result, !result ? "No record found" : "Record found successfully")

    }).catch((error) => {
        console.log(error)
        responseHandler.sendError(response, error)
    })

}

exports.mapfileAction = (request, response) => {
    let { id, value } = request.params

    mapfileDoa.mapfileAction({ id, value }).then((result) => {
        if (result.isActive === true) {
            responseHandler.sendSuccess(response, {}, "mapfile active successfully")
        }
        else {
            responseHandler.sendSuccess(response, {}, "mapfile inactive successfully")
        }
    }).catch((error) => {
        responseHandler.sendError(response, error)
    })
}

exports.mapfilesList = (request, response) => {
    let { pageNo, limit } = request.params;
    let { searchKey } = request.query

    pageNo = Number(pageNo);
    limit = Number(limit)

    mapfileDoa.mapfilesList({ pageNo, limit, searchKey }).then((result) => {

        responseHandler.sendSuccess(response, result, result.mapfiles.length ? "Records found successfully !" : "No records found !")

    }).catch((error) => {
        responseHandler.sendError(response, error)
    })
}

exports.editMapFile = (request, response) => {
    let { _id } = request.mapfile
    let { name, email, phone, address } = request.body
    let file = request.file

    if (file)
        var profilePicture = `/images/mapfiles/${file.filename}`

    mapfileDoa.editmapfile({ name, email, phone, address, profilePicture, _id }).then((result) => {

        responseHandler.sendSuccess(response, result, result ? "Record updated successfully !" : "No record updated !")

    }).catch((error) => {
        responseHandler.sendError(response, error)
    })
}

exports.editmapfileAdmin = (request, response) => {
    let { id } = request.params
    let { name, password, email, phone, address } = request.body
    let file = request.file

    if (file)
        var profilePicture = `/images/mapfiles/${file.filename}`

    mapfileDoa.editmapfileAdmin({ name, password, email, phone, address, profilePicture, id }).then((result) => {

        responseHandler.sendSuccess(response, result, result ? "Record updated successfully !" : "No record updated !")

    }).catch((error) => {
        responseHandler.sendError(response, error)
    })

}