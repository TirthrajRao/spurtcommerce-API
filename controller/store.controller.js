var product = require('../models/product.model');
var storeService = require('../services/store.service');
// npm import
const path = require('path');
const mongoose = require('mongoose');


const ObjectId = require('mongodb').ObjectId;

module.exports.getProductList = (req, res) => {
	const productData = {
		limit :10,
		offset : req.query.offset,
		keyword : req.query.keyword,
		sku : req.query.sku,
		count : req.query.count
	}

	storeService.getProductList(productData).then((response) => {
		return res.status(200).json({status:1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}
