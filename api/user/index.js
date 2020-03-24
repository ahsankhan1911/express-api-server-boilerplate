/* -- Routings --
    All the routing for module should be written here
*/

var express = require('express');
const controller = require('./user.controller');
const userMiddleware = require('./user.middleware') 

const userRouter = express.Router();

//user side
userRouter.route('/register').post(userMiddleware.validateUserCreate, controller.registerUser)
userRouter.route('/login').post([userMiddleware.validateUserLogin],controller.userLogin)
userRouter.route('/edit').post([userMiddleware.authenticateAccesstoken],controller.editUser)
userRouter.route('/details').get([userMiddleware.authenticateAccesstoken], controller.userDetails)


//admin side
userRouter.route('/create').post( [userMiddleware.authenticateAccesstoken, userMiddleware.validateUserCreate], controller.createUser)
userRouter.route('/details/:id').get([userMiddleware.authenticateAdminAccesstoken],controller.userDetails)
userRouter.route('/list/:pageNo/:limit').get([userMiddleware.authenticateAdminAccesstoken],controller.usersList)
userRouter.route('/edit/:id').post([userMiddleware.authenticateAdminAccesstoken],controller.editUserAdmin)
userRouter.route('/action/:id/:value').post([userMiddleware.authenticateAdminAccesstoken], controller.userAction)

module.exports = userRouter