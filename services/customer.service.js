// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var _ = require('lodash');


// Database models
var customer = require('../models/customer.model');
var address = require('../models/address.model');
var loginLog = require('../models/loginlog.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.registerCustomer = (customerData) => {
    console.log('addEmployeeToTheCompany customerData: ', customerData);
    return new Promise((resolve, reject) => {
        customer.create(customerData, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Thank you for registering with us and please check your email', data: userres });
            }
        });
    })
}

module.exports.login = (body) => {
    console.log('login body: ', body);
    return new Promise((resolve, reject) => {
        customer.findOne({ email: body.email })
            .exec((err, customer) => {
                if (err) {
                    reject({ status: 500, message: 'Internal Server Error' });
                } else if (customer) {
                    console.log("customer", customer);
                    customer.comparePassword(body.password, customer.password, (error, isMatch) => {
                        if (error) {
                            reject({ status: 403, message: 'user not found' });
                        } else if (isMatch) {
                            const payload = { customer };
                            var token = jwt.sign(payload, 'pmt');
                            console.log("Token = ", token);
                            const tokendata = {
                                token: token,
                            }
                            resolve({ status: 200, message: 'Successfully login', data: tokendata })
                        } else {
                            reject({ status: 403, message: 'Incorrect Password' });
                        }
                    });
                } else {
                    reject({ status: 500, message: 'User not found' });
                }

            });
    })
}


module.exports.updateAddress = (customerId, addressData) => {
    console.log('addEmployeeToTheCompany addressData: ', addressData);
    return new Promise((resolve, reject) => {
        customer.findByIdAndUpdate({ _id: customerId }, addressData, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully updated  customer address.', data: userres });
            }
        });
    })
}


module.exports.updateCustomer = (customerId, customerData) => {
    console.log('addEmployeeToTheCompany customerData: ', customerData);
    return new Promise((resolve, reject) => {
        customer.findByIdAndUpdate({ _id: customerId }, customerData, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Customer is updated successfully', data: userres });
            }
        });
    })
}

module.exports.customerList = (customerData) => {
    return new Promise((resolve, reject) => {
        if (customerData.count == 'true' || customerData.count == 1) {
            customer.count((useerr, userres) => {
                if (useerr) {
                    console.log('usererror: ', useerr);
                    reject({ status: 500, message: 'Internal Server Error' });
                } else {
                    resolve({ status: 200, message: 'Customer is updated successfully', data: userres });
                }
            });
        }
        else {
            customer.aggregate([
                {
                    $project: {
                        id: '$_id',
                        firstName: '$first_name',
                        password: '$code',
                        pincode: 1,
                        safe: '$name',
                        username: '$username',
                        email: '$email',
                        ip: '$ip',
                        isActive: 1,
                        avatar: '$avatar',
                        createdDate: '$created_date'

                    }
                },
            ]).exec(function (error, customerList) {
                if (error) {
                    return reject(error);
                } else {
                    return resolve({ status: 200, message: 'Successfully get settings', data: customerList });
                }
            })
        }

    })
}


module.exports.getProfile = (authorization) => {

    return new Promise((resolve, reject) => {

        jwt.verify(authorization.split(' ')[1], 'pmt', function (err, decoded) {
            if (err) throw err;
            const customerId = decoded.customer._id;
            customer.aggregate([
                {
                    $match: { '_id': ObjectId(customerId) }
                },
                {
                    $project: {
                        id: '$_id',
                        email: '$email',
                        firstName: '$first_name',
                        lastName: '$last_name',
                        mobileNumber: '$mobile',
                        modifiedDate: '$modified_date',
                        password: '$password',
                        pincode: '$pincode',
                        safe: '$safe',
                        username: '$username',
                        zoneId: '$zone_id',
                        address: '$address',
                        countryId: '$country_id',
                        avatar: '$avatar',
                        avatarPath: '$avatar_path',
                    }
                }
            ]).exec(function (error, productDetail) {
                if (error) {
                    return reject(error);
                } else {
                    return resolve({ status: 200, message: 'Successfully Get the Profile..!', data: productDetail[0] });
                }
            })
        });
    })
}


module.exports.deleteCustomer = (customerId) => {
    return new Promise((resolve, reject) => {
        customer.findByIdAndRemove({ _id: customerId }, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully deleted customer.', data: userres });
            }
        });
    })
}


module.exports.addCustomer = (customerData) => {
    console.log('addEmployeeToTheCompany customerData: ', customerData);
    return new Promise((resolve, reject) => {
        customer.create(customerData, (error, response) => {
            if (error) {
                console.log('usererror: ', error);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Customer Created successfully', data: response });
            }
        });
    })
}

module.exports.customerDetails = (customerId) => {
    return new Promise((resolve, reject) => {
        customer.aggregate([
            {
                $match: { _id: ObjectId(customerId) }
            },
            {
                $project: {
                    customerId: '$_id',
                    firstName: '$first_name',
                    password: '$code',
                    pincode: 1,
                    safe: '$name',
                    username: '$username',
                    email: '$email',
                    ip: '$ip',
                    isActive: 1,
                    avatar: '$avatar',
                    mobileNumber: '$mobile',
                    productList: []
                }
            },
        ]).exec(function (error, customerList) {
            if (error) {
                return reject(error);
            } else {
                return resolve({ status: 200, message: 'Successfully get settings', data: customerList[0] });
            }
        })

    })
}

module.exports.addAddress = (addressData) => {
    console.log('addEmployeeToTheCompany addressData: ', addressData);
    return new Promise((resolve, reject) => {
        address.create(addressData, (error, response) => {
            if (error) {
                console.log('usererror: ', error);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'New Address is created successfully', data: response });
            }
        });
    })
}


module.exports.addressList = (customerId) => {
    return new Promise((resolve, reject) => {
        address.aggregate([
            {
                $match: { customer_id: ObjectId(customerId) }
            },
            {
                $project: {
                    addressId: '$_id',
                    address1: '$address_1',
                    address2: '$address_2',
                    addressType: '$address_type',
                    city: '$city',
                    postcode: '$postcode',
                    state: '$state',
                    isActive: 1,
                }
            },
        ]).exec(function (error, customerList) {
            if (error) {
                return reject(error);
            } else {
                return resolve({ status: 200, message: 'Successfully get customer address list', data: customerList });
            }
        })

    })
}


module.exports.updateAddressById = (addressId, addressData) => {
    console.log('addEmployeeToTheCompany addressData: ', addressData);
    return new Promise((resolve, reject) => {
        address.findByIdAndUpdate({ _id: addressId }, addressData, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully updated address.', data: userres });
            }
        });
    })
}


module.exports.deleteAddress = (addressId) => {
    return new Promise((resolve, reject) => {
        address.findByIdAndRemove({ _id: addressId }, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully deleted address.', data: userres });
            }
        });
    })
}


module.exports.editProfile = (userData) => {

    return new Promise((resolve, reject) => {
        customer.findOneAndUpdate({ email: userData.email }, userData, { upsert: true }, (error, updatedCustomer) => {
            if (error) {
                console.log('error: ', error);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully updated your profile.', data: updatedCustomer });
            }
        });
    })
}


module.exports.loginLogList = () => {
    let arr = [];
    return new Promise((resolve, reject) => {
        loginLog.find((error, loginLogList) => {
            if (error) {
                console.log('error: ', error);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                console.log("Login log List", loginLogList);
                _.forEach(loginLogList, (loginLog) => {
                    console.log("login log", loginLog.created_date);
                    arr.push(loginLog.created_date);
                })
                
                // fill it with array with your data
                  var  results = {}, rarr = [], i, date;

                for (i = 0; i < arr.length; i++) {
                    // get the date
                    date = [arr[i].getFullYear(), arr[i].getMonth(), arr[i].getDate()].join("-");
                    results[date] = results[date] || 0;
                    results[date]++;
                }
                // you can always convert it into an array of objects, if you must
                for (i in results) {
                    if (results.hasOwnProperty(i)) {
                        rarr.push({ createdDate: i, logcount: results[i] });
                    }
                }
                resolve({ status: 200, message: 'Successfully get login Log list', data: rarr });
            }
        });
    })
}






