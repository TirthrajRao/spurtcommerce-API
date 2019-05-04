var manufacture = require('../models/manufacture.model');
var manufactureService = require('../services/manufacture.service');
// npm import
const path = require('path');
const mongoose = require('mongoose');

// Database Model

// Services
// Static variables
const ObjectId = require('mongodb').ObjectId;

module.exports.getManufacture = (req, res) => {
	manufactureService.manufactureList().then((response) => {
		return res.status(200).json({status:1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}