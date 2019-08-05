const _ = require('lodash'),
	logger = require('../logger'),
	requestClient = require('../requestClient'),
	appUtils = require('../appUtils'),
	customException = require('../customException'),

	//Twilio Constants
	TWILIO_NUMBER =  process.env.TWILIO_NUMBER,
	ACCOUNT_SID = process.env.ACCOUNT_SID,
	AUTH_TOKEN = process.env.AUTH_TOKEN,
	// twilio = require('twilio'),
	client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN),
	TWILIO_LOOKUP_API = "https://[ACCOUNT_SID]:[AUTH_TOKEN]@lookups.twilio.com/v1/PhoneNumbers/[NUMBER]?Type=carrier&Type=caller-name",
	
	NUMBER = '[NUMBER]',
	TAG = 'oddsapp-sms';

var smsCounter = 0;



function _sendMessage(to, body){
		return client.messages.create(_log({
			to: to,
			from: TWILIO_NUMBER,
			body: body
		}))
	.then(function(data){
	return 	data
	}).catch(function(error){
		if(error.status === 400 && error.code === 21211) {
			throw new customException.customErrorException('Invalid Phone Number', null)
		}
		console.log(error);
		throw new customException.someThingWentWrongException()
		
	});
}


// function _validateNumberWithTwilio(phoneNumber){
// 	var url = TWILIO_LOOKUP_API.replace(ACCOUNT_SID, process.env.ACCOUNT_SID).replace(AUTH_TOKEN, process.env.AUTH_TOKEN).replace(NUMBER, phoneNumber);
// 	//Hit Url
// 	return requestClient.GET(url).then(function(data){
// 		//logger.debug(TAG, data);
// 	}).catch(function(error){
// 		throw customException.invalidMobileNumberException();
// 	});
// }

function _log(smsData){
	// create object
	var sms = _.clone(smsData);
	//Add Timestamp
	sms.sentAt = new Date();
	//Log Data
	logger.logger(TAG, sms);
	console.log(sms);
	return smsData;
}

// function _validateNumber(number){
// 	if(!appUtils.isValidPhone(number, true)){
// 		throw customException.invalidMoileNumberException();
// 	}
// 	if(smsCounter > 100){
// 		throw customException.actionBlockedExceptionException();
// 	}
// }

//========================== Export Module Start ==========================
module.exports = {
	send: _sendMessage
}
//========================== Export Module End ============================