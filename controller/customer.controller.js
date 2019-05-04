var customer = require('../models/customer.model');
var customerService = require('../services/customer.service');
// npm import
const path = require('path');
const mongoose = require('mongoose');

// Database Model

// Services
// Static variables
const ObjectId = require('mongodb').ObjectId;

module.exports.register = (req, res) => {
	const body = req.body;
	customerService.registerCustomer(body).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}


module.exports.login = (req, res) => {
	const customerData = {
		email:req.body.emailId,
		password:req.body.password,
	}
	console.log("customer Data",customerData);
	customerService.login(customerData).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}