// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');

// Database models
var emailTemp = require('../models/emailtemp.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;


module.exports.emailTemplateList = (emailTempData) => {

    return new Promise((resolve, reject) => {


        emailTemp.aggregate([
            {
                $project: {
                    content: '$message',
                    emailTemplateId: '$_id',
                    isActive: '$is_active',
                    subject: '$subject',
                    title: '$shortname',
                }
            }
        ]).exec(function (emailTempErr, emailTempList) {
            if (emailTempErr) {
                console.log('emailTempError: ', emailTempErr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully get emailTemplate list', data: emailTempList });
            }
        });
    })
}


module.exports.updateEmailTemplate = (emailTempId, emailTempData) => {

    return new Promise((resolve, reject) => {
        emailTemp.findByIdAndUpdate({ _id: emailTempId }, emailTempData, { upsert: true }, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully updated Email Template', data: userres });
            }
        });
    })
}



module.exports.deleteEmailTemplate = (emailTempId) => {

    return new Promise((resolve, reject) => {
        orderStatus.findByIdAndRemove({ _id: emailTempId }, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully deleted Email Template.', data: userres });
            }
        });
    })
}








