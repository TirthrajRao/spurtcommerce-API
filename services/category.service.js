// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');
var _ = require('lodash');


// Database models
var category = require('../models/category.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.categoryList = ()=> {
    return new Promise((resolve, reject) => {
        category.find((useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully got the complete list of categorys', data: userres });
            }
        });
    })
}

module.exports.deleteCategory = (categoryId)=> {
    console.log("body in country===>",categoryId);
    return new Promise((resolve, reject) => {
        category.findoneAndRemove({_id:categoryId},(useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully deleted Category.', data: userres });
            }
        });
    })
}

module.exports.addCategory = (categoryData)=> {
    console.log("categoryData in country===>",categoryData);
    return new Promise((resolve, reject) => {
        category.create(categoryData, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully created new Category.', data: userres });
            }
        });
    })
}

module.exports.updateCategory = (categoryId,categoryData)=> {
    console.log("categoryData in service===>",categoryData);
    console.log("categoryid in service====>",categoryId);
    return new Promise((resolve, reject) => {
        category.findByIdAndUpdate({_id:categoryId},categoryData, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully updated Category.', data: userres });
            }
        });
    })
}

