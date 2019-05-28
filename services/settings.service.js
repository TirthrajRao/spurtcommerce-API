// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');


// Database models
var settings = require('../models/settings.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.settingsList = () => {
    return new Promise((resolve, reject) => {
        settings.aggregate([
            {
                $project: {
                    facebook: '$facebook',
                    google: '$google',
                    twitter: '$twitter',
                    instagram: '$instagram',
                    storeEmail: '$store_email',
                    isActive: 1,
                    storeAddress: '$store_address',
                    orderStatus: '$order_status',
                    storeLanguageName: '$store_language_name',
                    storeLogo: '$store_logo',
                    storeLogoPath: '$store_logo_path',
                    storeName: '$store_name',
                    storeOwner: '$store_owner',
                    storeTelephone: '$store_telephone',
                    categoryProductCount: 1,
                    storeLanguageName:'$store_language_name',
                    itemsPerPage:'$items_per_page'
                }
            },
        ]).exec(function (error, settingsList) {
            if (error) {
                return reject(error);
            } else {
                return resolve({ status: 200, message: 'Successfully get settings', data: settingsList });
            }
        })

    })
}
