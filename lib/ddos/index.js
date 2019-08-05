const Ddos = require('ddos')


//This function run every time when a request is denied by DDOS method
function onDenial (req) { 
console.log("REQUEST DENIED !!", req)
}

var ddos = new Ddos({
    burst:4, 
    limit:3, 
    testmode:true, 
    maxcount:5,
    checkinterval:2, 
    maxexpiry:1, 
    onDenial
})

/*
To use this module import and paste below code in app.js

app.use(ddos.express);

*/

exports.ddos = ddos