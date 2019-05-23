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






