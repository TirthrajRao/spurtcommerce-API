// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');

// Database models
var orderStatus = require('../models/order_status.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.orderStatusList = ()=> {
    return new Promise((resolve, reject) => {
        orderStatus.find((useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully got the complete list of products', data: userres });
            }
        });
    })
}

module.exports.orderStatusList = ()=> {
    return new Promise((resolve, reject) => {
        orderStatus.find((useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully got the complete list of products', data: userres });
            }
        });
    })
}






