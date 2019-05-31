// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');

// Database models
var page = require('../models/page.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.pageList = (productData) => {
    return new Promise((resolve, reject) => {
        page.aggregate([
            {
                $project: {
                    'pageId': '$_id',
                    'metaTagContent': '$meta_tag_description',
                    'metaTagKeyword': '$meta_tag_keywords',
                    'metaTagTitle': '$meta_tag_title',
                    'title': '$title',
                    'isActive':'1',
                    'content':'$full_text',
                }
            },
        ])
        .limit(4)
        .exec(function (error, topSelling) {
            if (error) {
                return reject(error);
            } else {
                return resolve({ status: 200, message: 'Successfully get product list', data: topSelling });
            }
        })

    })
}

module.exports.updatePageDetail = (pageId, pageData) => {

    return new Promise((resolve, reject) => {
        page.findOneAndUpdate({ _id: pageId }, pageData, { upsert: true }, (zoneErr, updatePageDetail) => {
            if (zoneErr) {
                console.log('zoneError: ', zoneErr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully updated page.', data: updatePageDetail });
            }
        });
    })
}


