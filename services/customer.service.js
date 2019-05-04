// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');


// Database models
var customer = require('../models/customer.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.registerCustomer = (body)=> {
    console.log('addEmployeeToTheCompany body: ', body);
    return new Promise((resolve, reject) => {
        customer.create(body, (useerr, userres) => {
            if (useerr) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully created', data: userres });
            }
        });
    })
}

module.exports.login = (body)=> {
    console.log('login body: ', body);
    return new Promise((resolve, reject) => {
        customer.findOne({ email : body.email } )
        .exec((err, user)=>{
            if (err) {
               reject({ status: 500, message: 'Internal Server Error' });  
            }else if(user){
                user.comparePassword(body.password, user.password,(error, isMatch)=>{
                    if (error){
                        reject({ status: 403, message: 'user not found' });  
                    }else if(isMatch){
                        const payload = {user};
                        var token = jwt.sign(payload,'pmt');
                        console.log("Token = ",token);
                        resolve({status:200 , message:'Successfully login', data: token}) 
                    }else{
                        reject({ status: 403, message: 'Internal Server Error' });  
                    }
                });
            }else{
                reject({ status: 500, message: 'User not found' });
            }    

        });
    })
}






