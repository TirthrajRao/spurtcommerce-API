var contact = require('../models/contact.model');
var contactService = require('../services/contact.service');
// npm import
const path = require('path');
const mongoose = require('mongoose');


const ObjectId = require('mongodb').ObjectId;

module.exports.addResponse = (req, res) => {
	const body = req.body;
	contactService.addResponse(body).then((response) => {
		return res.status(200).json({status:1, message: response.message});
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}
