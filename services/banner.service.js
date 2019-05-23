// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');

// Database models
var banner = require('../models/banner.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.bannerList = () => {
    return new Promise((resolve, reject) => {
        banner.aggregate([
            {
                $project: {
                    bannerId: '$_id',
                    content: '$content',
                    image: '$image',
                    imagePath: '$image_path',
                    link: '$link',
                    position: 2,
                    title: '$title',
                }

            },
        ])
            .exec(function (error, bannerList) {
                if (error) {
                    return reject(error);
                } else {
                    return resolve({ status: 200, message: 'Successfully got banner list', data: bannerList });
                }
            })

    })
}


module.exports.addBanner = (body) => {
    return new Promise((resolve, reject) => {
        banner.create(body, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'New banner is created successfully', data: userres });
            }
        });
    })
}

module.exports.deleteBanner = (bannerid) => {
    console.log("body in banner===>", bannerid);
    return new Promise((resolve, reject) => {
        banner.findOneAndRemove({ _id: bannerid }, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully deleted Banner.', data: userres });
            }
        });
    })
}

module.exports.updateBanner = (bannerid, bannerData) => {
    console.log("body in banner===>", bannerid);
    console.log("banner Data in service=====>", bannerData);
    return new Promise((resolve, reject) => {
        banner.findOneAndUpdate({ _id: bannerid }, bannerData, { upsert: true }, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully updated banner.', data: userres });
            }
        });
    })
}



