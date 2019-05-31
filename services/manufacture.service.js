// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');

// Database models
var manufacture = require('../models/manufacture.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.manufactureList = (brandData) => {
    return new Promise((resolve, reject) => {
        if (brandData.count == 'true' || brandData.count == 1) {
            manufacture.count((useerr, userres) => {
                if (useerr) {
                    console.log('usererror: ', useerr);
                    reject({ status: 500, message: 'Internal Server Error' });
                } else {
                    resolve({ status: 200, message: 'Successfully get manufacturer list', data: userres });
                }
            });

        }
        else {
            const aggregate = [{
                $project: {
                    manufacturerId: '$_id',
                    isActive: '$is_active',
                    image: '$image',
                    imagePath: '$image_path',
                    name: '$name'
                }
            }]
            if (brandData.limit) {
                aggregate.push({ $limit: brandData.offset + brandData.limit });
                aggregate.push({ $skip: brandData.offset });
            }
            console.log('agreaget: ', aggregate);
            manufacture.aggregate(aggregate).exec(function (Error, Response) {
                if (Error) {
                    console.log("Error---------->>>>>", Error);
                    reject({ status: 500, message: 'Internal Server Error' });
                } else {
                    resolve({ status: 200, message: 'Successfully get manufacturer list', data: Response });
                }
            })
        }

    })
}

module.exports.updateManufacturer = (brandData) => {
    console.log("banner Data in service=====>", brandData);
    return new Promise((resolve, reject) => {
        manufacture.findByIdAndUpdate({ _id: brandData.manufacturer_id }, brandData, { upsert: true }, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully updated Manufacturer.', data: userres });
            }
        });
    })
}

module.exports.addManufacturer = (brandData) => {
    console.log("banner Data in service=====>", brandData);
    return new Promise((resolve, reject) => {
        manufacture.create(brandData, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully created new Manufacturer.', data: userres });
            }
        });
    })
}

module.exports.deleteManufacturer = (manufacturerId) => {

    return new Promise((resolve, reject) => {
        manufacture.findOneAndRemove({ _id: manufacturerId }, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully deleted Manufacturer.', data: userres });
            }
        });
    })
}



