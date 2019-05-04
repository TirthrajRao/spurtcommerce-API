// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');

// Database models
var currency = require('../models/currency.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.currencyList = ()=> {
    return new Promise((resolve, reject) => {
        currency.find((useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully get currency list	', data: userres });
            }
        });
    })
}


module.exports.addCurrency = (currencyData)=> {
	console.log("currencyData in country===>",currencyData);
    return new Promise((resolve, reject) => {
        currency.create(currencyData, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully created new Currency.', data: userres });
            }
        });
    })
}

module.exports.deleteCurrency = (currencyId)=> {
	console.log("body in country===>",currencyId);
    return new Promise((resolve, reject) => {
        currency.findOneAndRemove({_id:currencyId}, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully deleted country.', data: userres });
            }
        });
    })
}

module.exports.updateCurrency = (currencyId,countryData)=> {
	console.log("body in country===>",currencyId);
	console.log("country Data in service=====>",countryData);
    return new Promise((resolve, reject) => {
        currency.findOneAndUpdate({_id:currencyId},countryData,{upsert:true},(useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully updated Currency', data: userres });
            }
        });
    })
}



