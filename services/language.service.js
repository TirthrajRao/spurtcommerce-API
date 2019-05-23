// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');

// Database models
var language = require('../models/language.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.languageList = () => {
    return new Promise((resolve, reject) => {
        language.aggregate([
            {
                $project: {
                    languageId:'$_id',
                    code:'$code',
                    image:'$image',
                    imagePath:'$image_path',
                    isActive: 1,
                    name:'$name',
                    sortOrder:'$sort_order'
                }
            },
        ]).exec(function (error, languageList) {
            if (error) {
                return reject(error);
            } else {
                return resolve({ status: 200, message: 'Successfully get settings', data: languageList });
            }
        })

    })
}


