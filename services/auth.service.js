// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Database models
var user = require('../models/user.model');
var usergroup = require('../models/usergroup.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.login = (body) => {
    console.log('login body: ', body);
    return new Promise((resolve, reject) => {
        user.findOne({ username: body.username })
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

                            const userData = {
                                address: customer.address,
                                avatar: customer.avatar,
                                avatarPath: customer.avatar_path,
                                createdDate: customer.created_date,
                                email: customer.email,
                                firstName: customer.first_name,
                                isActive: 1,
                                lastName: customer.last_name,
                                phoneNumber: customer.phone_number,
                                userId: customer._id,
                                username: customer.username
                            }
                            const tokendata = {
                                token: token,
                                user: userData,
                            }
                            console.log("Token = ", tokendata);

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


module.exports.userList = (userData) => {
    return new Promise((resolve, reject) => {
        if (userData.count == 'true' || userData.count == 1) {

            user.count((useerr, userres) => {
                if (useerr) {
                    console.log('usererror: ', useerr);
                    reject({ status: 500, message: 'Internal Server Error' });
                } else {
                    resolve({ status: 200, message: 'Successfully got the complete list of categorys', data: userres });
                }
            });
        }
        else {
            user.aggregate([
                {
                    $project: {
                        userId: '$_id',
                        username: '$name',
                        address: '$image',
                        avatar: '$avatar',
                        avatarPath: '$avatar_path',
                        email: '$email',
                        firstName: '$first_name',
                        lastName: '$last_name',
                        phoneNumber: '$phone_number',
                        username: '$username',
                        usergroupId: '$user_group_id'
                    }
                },
                {
                    $lookup: {
                        from: 'user_group',
                        localField: 'usergroupId',
                        foreignField: '_id',
                        as: 'usergroup'
                    }
                },
                {
                    $unwind: '$usergroup'
                },
                {
                    $project: {
                        usergroup: {
                            groupId: '$usergroup._id',
                            name: '$usergroup.name',
                            createdDate: '$usergroup.createdDate',
                        },
                        userId: 1,
                        username: 1,
                        address: 1,
                        avatar: 1,
                        avatarPath: 1,
                        email: 1,
                        firstName: 1,
                        lastName: 1,
                        phoneNumber: 1,
                        username: 1,
                        usergroupId: 1
                    }
                },
            ])
                .exec(function (Error, Response) {
                    if (Error) {
                        reject({ status: 500, message: 'Internal Server Error' });
                    } else {
                        resolve({ status: 200, message: 'Successfully get All user List', data: Response });
                    }
                })

        }
    })
}


module.exports.roleList = (userData) => {
    return new Promise((resolve, reject) => {
        if (userData.count == 'true' || userData.count == 1) {

            usergroup.count((useerr, userres) => {
                if (useerr) {
                    console.log('usererror: ', useerr);
                    reject({ status: 500, message: 'Internal Server Error' });
                } else {
                    resolve({ status: 200, message: 'Successfully got the complete list of categorys', data: userres });
                }
            });
        }
        else {
            usergroup.aggregate([
                {
                    $project: {
                        group_id: '$_id',
                        name: '$name',
                    }
                },
            ]).exec(function (Error, Response) {
                if (Error) {
                    reject({ status: 500, message: 'Internal Server Error' });
                } else {
                    resolve({ status: 200, message: 'Successfully get role list', data: Response });
                }
            })
        }
    })
}








