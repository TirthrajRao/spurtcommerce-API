// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');

// Database models
var country = require('../models/country.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.countryList = ()=> {
    return new Promise((resolve, reject) => {
        country.find((useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully get country list	', data: userres });
            }
        });
    })
}


module.exports.addCountry = (body)=> {
	console.log("body in country===>",body);
    return new Promise((resolve, reject) => {
        country.create(body, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'New country is created successfully', data: userres });
            }
        });
    })
}

module.exports.deleteCountry = (countryid)=> {
	console.log("body in country===>",countryid);
    return new Promise((resolve, reject) => {
        country.findOneAndRemove({_id:countryid}, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully deleted country.', data: userres });
            }
        });
    })
}

module.exports.updateCountry = (countryid,countryData)=> {
	console.log("body in country===>",countryid);
	console.log("country Data in service=====>",countryData);
    return new Promise((resolve, reject) => {
        country.findOneAndUpdate({_id:countryid},countryData,{upsert:true},(useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully updated country.', data: userres });
            }
        });
    })
}



