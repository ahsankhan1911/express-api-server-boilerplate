/* -- Routings --
    All the routing for module should be written here
*/

var express = require('express');
const controller = require('./map_file.controller');
const userMiddleware = require('../user/user.middleware')

const mapfileRouter = express.Router();


mapfileRouter.route('/create').post([userMiddleware.authenticateAccesstoken, userMiddleware.validateUserCreate], controller.createUser)
mapfileRouter.route('/action/:id/:value').post([userMiddleware.authenticateAdminAccesstoken], controller.userAction)
mapfileRouter.route('/edit').post([userMiddleware.authenticateAccesstoken, userMiddleware.userProfilePictureUpload], controller.editUser)
mapfileRouter.route('/edit/:id').post([userMiddleware.authenticateAdminAccesstoken, userMiddleware.uploadUserProfilePicture], controller.editUserAdmin)

mapfileRouter.route('/login').post([userMiddleware.validateUserLogin], controller.userLogin)
mapfileRouter.route('/details/:id').get([userMiddleware.authenticateAdminAccesstoken], controller.userDetails)
mapfileRouter.route('/list/:pageNo/:limit').get([userMiddleware.authenticateAdminAccesstoken], controller.usersList)


module.exports = mapfileRouter