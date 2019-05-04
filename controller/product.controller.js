var product = require('../models/product.model');
var productService = require('../services/product.service');
// npm import
const path = require('path');
const mongoose = require('mongoose');


const ObjectId = require('mongodb').ObjectId;

module.exports.productList = (req, res) => {
	productService.productList().then((response) => {
		return res.status(200).json({status:1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.getfeatureproduct = (req, res) => {
	productService.getfeatureproduct().then((response) => {
		return res.status(200).json({status:1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.productDetail = (req, res) => {
	const productId = req.params.id;
	productService.productDetail(productId).then((response) => {
		return res.status(200).json({status:1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}



