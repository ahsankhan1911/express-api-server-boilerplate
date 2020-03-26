/* -- Routings --
    All the routing for module should be written here
*/

var express = require('express');
const controller = require('./map_file.controller');
const mapFileMiddleware = require('./map_file.middleware')
const userMiddleware = require('../user/user.middleware')

const mapfileRouter = express.Router();


mapfileRouter.route('/create').post([userMiddleware.authenticateAccesstoken, mapFileMiddleware.validateMapFileCreate], controller.createMapFile)
mapfileRouter.route('/details/:id').get([userMiddleware.authenticateAccesstoken], controller.mapFileDetails)
mapfileRouter.route('/update/:id').post([userMiddleware.authenticateAccesstoken], controller.mapFileUpdate)
mapfileRouter.route('/delete').post([userMiddleware.authenticateAccesstoken], controller.mapFileDelete)
mapfileRouter.route('/search').post([userMiddleware.authenticateAccesstoken], controller.mapFileDelete)


//Admin side
mapfileRouter.route('/list/:pageNo/:limit').get([userMiddleware.authenticateAdminAccesstoken], controller.mapList)
mapfileRouter.route('/action/:id/:value').post([userMiddleware.authenticateAdminAccesstoken], controller.mapAction)


module.exports = mapfileRouter