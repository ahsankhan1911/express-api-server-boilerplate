
const nodemailer = require("nodemailer");
const Promise = require('bluebird')
const sgTransport = require('nodemailer-sendgrid-transport');

const basicOptions = {
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD 
  }
}
const basicTransporter = nodemailer.createTransport({
    service: 'gmail',
    basicOptions
  });


  const optionsforSendgrid = {
    auth: {
      api_user: process.env.SENDGRID_API_USER,
      api_key: process.env.SENDGRID.API_KEY
    }
  }
  const sendgridTransport = nodemailer.createTransport(sgTransport(optionsforSendgrid));

  exports.basic = {
    mailOptions:  function(to, from ,code)  { return { 
       to: to, // list of receivers
      from: from, // sender address
      subject: "Please verify your email", // Subject line
      text: `Use ${code} to verify your account with ${process.env.APP_NAME}`, // plain text body
      // html: "<b>Hello world?</b>" // html body
    }},
    sendVerificationEmail: (to, from ,code) => {

      return new Promise( function(resolve, reject) {
        basicTransporter.sendMail(this.basic.mailOptions(to, from ,code), (err, info) => {

              if(err) {
                return reject(err)
              }
              return resolve(info)
              
        }) 
          
      })
      
    
    }
  }


exports.sendGrid = {
    mailOptions:  function(to, from ,code)  { return { 
       to: to, // list of receivers
      from: from, // sender address
      subject: "Please verify your email", // Subject line
      text: `Use ${code} to verify your account with ${process.env.APP_NAME}`, // plain text body
      // html: "<b>Hello world?</b>" // html body
    }},
    sendVerificationEmail: (to, from ,code) => {

      return new Promise( function(resolve, reject) {
        sendgridTransport.sendMail(this.sendGrid.mailOptions(to, from ,code), (err, info) => {

              if(err) {
                return reject(err)
              }
              return resolve(info)
              
        }) 
          
      })
    }
  }