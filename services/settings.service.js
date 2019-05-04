// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');


// Database models
var settings = require('../models/settings.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.settingsList = ()=> {
    return new Promise((resolve, reject) => {
        settings.find((settingError, settingList) => {
            if (settingError) {
                console.log('usererror: ', settingError);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully get settings', data: settingList });
            }
        });
    })
}
