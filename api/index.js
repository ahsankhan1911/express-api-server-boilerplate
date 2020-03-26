const responseHandler = require('../lib/responseHandler'),

userRouter = require('./user'),
mapFileRouter = require('./map_file');
	
module.exports = function(app){

	app.use('/api/user', userRouter);
	app.use('/api/map_file', mapFileRouter)

	// // Attach ErrorHandler to Handle All Errors
	app.use(responseHandler.handleError);
}