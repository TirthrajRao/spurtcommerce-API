var user = require('../models/user.model');
var authService = require('../services/auth.service');
// npm import
const path = require('path');
const mongoose = require('mongoose');

// Static variables
const ObjectId = require('mongodb').ObjectId;

module.exports.login = (req, res) => {
	const customerData = {
		username: req.body.username,
		password: req.body.password,
	}
	console.log("customer Data", customerData);
	authService.login(customerData).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data, status: 1 });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.userList = (req, res) => {

	const userData = {
		limit: 10,
		offset: req.query.offset,
		keyword: req.query.keyword,
		sku: req.query.sku,
		count: req.query.count
	}
	authService.userList(userData).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data, status: 1 });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.roleList = (req, res) => {

	const userData = {
		limit: 10,
		offset: req.query.offset,
		keyword: req.query.keyword,
		sku: req.query.sku,
		count: req.query.count
	}
	authService.roleList(userData).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data, status: 1 });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}


module.exports.changePassword = (req, res) => {

	const authorization = req.header('authorization');
	authService.getProfile(authorization).then((response) => {

	

		const userData = {
			newPassword: req.body.newPassword,
			oldPassword: req.body.oldPassword,
		}

		let userId = response.data._id;

		authService.changePassword(userId,userData).then((response) => {
			return res.status(200).json({ message: response.message, status: 1 });
		}).catch((error) => {
			console.log('error: ', error);
			return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
		});


	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
	
}







