/* -- Routings --
    All the routing for module should be written here
*/

var express = require('express');
const controller = require('./userController');
const userMiddleware = require('./userMiddleware') 

const userRouter = express.Router();


userRouter.route('/create').post( [userMiddleware.authenticateAdminAccesstoken, userMiddleware.validateUserCreate], controller.createUser)
userRouter.route('/action/:id/:value').post([userMiddleware.authenticateAdminAccesstoken], controller.userAction)
userRouter.route('/edit').post([userMiddleware.authenticateAccesstoken, userMiddleware.uploadUserProfilePicture],controller.editUser)
userRouter.route('/edit/:id').post([userMiddleware.authenticateAdminAccesstoken, userMiddleware.uploadUserProfilePicture],controller.editUserAdmin)

userRouter.route('/login').post([userMiddleware.validateUserLogin],controller.userLogin)
userRouter.route('/details/:id').get([userMiddleware.authenticateAdminAccesstoken],controller.userDetails)
userRouter.route('/list/:pageNo/:limit').get([userMiddleware.authenticateAdminAccesstoken],controller.usersList)


module.exports = userRouter