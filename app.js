'use strict';
var path = require('path');
// Load .env file
require('dotenv').load({
  path: path.join(__dirname, './.env'),
  silent: true
});


var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var Ddos = require('ddos')

var PORT = process.env.PORT || 5000

console.log(`${process.env.APP_NAME} app starting on ${process.env.NODE_ENV} environment`)
console.log()



/**
 * MongoDB Config
 */
mongoose.Promise = require('bluebird')
// mongoose.set('debug', process.env.NODE_ENV === 'development' ? true : false );

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useMongoClient: true }).then((result) => {

  console.log("Connected To MongoDB on :", {
    Database: result.name,
    Port: result.port,
    Host: result.host
  })
  return;
}).catch((error) => {
  throw new Error(error.message)
})
/**
 * MongoDB Config End
 */




//Disable x-powered-by response header for appilcation security purpose
app.disable('x-powered-by');

//Compressing static resources
app.use(compression());

//Serving images always from public folder
app.use('/images', express.static('./public/images'))

// app.set('views', path.join(__dirname, 'public'))


//CORS congif
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
   }

  next();
});

//body parser middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies


//API urls binded
require('./api')(app)


app.get('/', (req, res) => {
  res.send('Express server app !')
})

//404
app.use((req, res) => {
  res.status(404).json(
    {
      "statusCode": 404,
      "success": false,
      "message": "Url not found",

    }
    );
});


app.listen(PORT, () => {
  console.log('Running server on ' + PORT);
});