var page = require('../models/page.model');
var pageService = require('../services/page.service');
// npm import
const path = require('path');
const mongoose = require('mongoose');


const ObjectId = require('mongodb').ObjectId;

module.exports.getPage = (req, res) => {
	pageService.pageList().then((response) => {
		return res.status(200).json({status:1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}