// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');

// Database models
var page = require('../models/page.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.pageList = ()=> {
    return new Promise((resolve, reject) => {
        page.find((useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully get pages List', data: userres });
            }
        });
    })
}


