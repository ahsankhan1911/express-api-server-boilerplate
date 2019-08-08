
const nodemailer = require("nodemailer");
const Promise = require('bluebird')
const sgTransport = require('nodemailer-sendgrid-transport');
const util = require('util')



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

  const sendBasic = basicTransporter.sendMail
  const sendSendgrid = sendgridTransport.sendMail

  exports.basic = {
    mailOptions:  function(to, from ,code)  { return { 
       to: to, // list of receivers
      from: from, // sender address
      subject: "Please verify your email", // Subject line
      text: `Use ${code} to verify your account with ${process.env.APP_NAME}`, // plain text body
      // html: "<b>Hello world?</b>" // html body
    }},
    sendVerificationEmail: (to, from ,code) => {

      return sendBasic(this.basic.mailOptions(to, from ,code))
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

         return sendSendgrid(this.sendGrid.mailOptions(to, from ,code)) 
          
    }
  }