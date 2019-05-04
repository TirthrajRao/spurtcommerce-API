// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');

// Database models
var manufacture = require('../models/manufacture.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.manufactureList = ()=> {
    return new Promise((resolve, reject) => {
        manufacture.find((useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully get manufacturer list', data: userres });
            }
        });
    })
}


