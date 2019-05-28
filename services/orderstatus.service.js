// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');

// Database models
var orderStatus = require('../models/order_status.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.orderStatusList = () => {
    return new Promise((resolve, reject) => {
        orderStatus.aggregate([
            {
                $project:{
                    orderStatusId:'$_id',
                    colorCode:'$color_code',
                    name:'$name',
                    isActive:'$is_active'
                }
            }
        ]).exec(function (orderErr, orderStatus) {
            if (orderErr) {
                console.log('order error: ', orderErr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                console.log("orderStatus", orderStatus);
                resolve({ status: 200, message: 'Successfully got the complete order status list.', data: orderStatus });
            }
        })

    })
}

module.exports.orderStatusById = (orderStatusId) => {
    return new Promise((resolve, reject) => {

        orderStatus.aggregate([
            {
                $match: { _id: ObjectId(orderStatusId) }
            }
        ]).exec(function (orderErr, orderStatus) {
            if (orderErr) {
                console.log('order error: ', orderErr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                console.log("orderStatus", orderStatus);
                resolve({ status: 200, message: 'Successfully got the complete list of products', data: orderStatus });
            }
        })

    })
}






