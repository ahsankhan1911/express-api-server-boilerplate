/* -- Routings --
    All the routing for module should be written here
*/

var express = require('express');
const controller = require('./transaction.controller');
const userMiddleware = require('./transaction.middleware') 

const transactionRouter = express.Router();


transactionRouter.route('/create').post( [userMiddleware.authenticateAdminAccesstoken, userMiddleware.validateUserCreate], controller.createUser)
transactionRouter.route('/action/:id/:value').post([userMiddleware.authenticateAdminAccesstoken], controller.userAction)
transactionRouter.route('/edit').post([userMiddleware.authenticateAccesstoken, userMiddleware.userProfilePictureUpload],controller.editUser)
transactionRouter.route('/edit/:id').post([userMiddleware.authenticateAdminAccesstoken, userMiddleware.uploadUserProfilePicture],controller.editUserAdmin)

transactionRouter.route('/login').post([userMiddleware.validateUserLogin],controller.userLogin)
transactionRouter.route('/details/:id').get([userMiddleware.authenticateAdminAccesstoken],controller.userDetails)
transactionRouter.route('/list/:pageNo/:limit').get([userMiddleware.authenticateAdminAccesstoken],controller.usersList)


module.exports = transactionRouter