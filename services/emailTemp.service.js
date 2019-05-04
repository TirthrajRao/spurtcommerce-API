// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');

// Database models
var emailTemp = require('../models/emailtemp.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;


module.exports.emailTemplateList = (emailTempData)=> {

    console.log("email temp data",emailTempData);
    return new Promise((resolve, reject) => {


        emailTemp.aggregate([
        {
            $limit:emailTempData.limit
        },
        ]).exec(function(emailTempErr, emailTempList){
            if (emailTempErr) {
                console.log('emailTempError: ', emailTempErr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully get emailTemplate list', data: emailTempList });
            }
        });
    })
}






