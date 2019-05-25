var order = require('../models/order.model');
var orderService = require('../services/order.service');
var customerService = require('../services/customer.service');
var _ = require('lodash');
var orderProduct = require('../models/order_product.model');


// npm import
const path = require('path');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;


module.exports.orderList = (req, res) => {
	const orderData = {
		limit: 10,
		offset: req.query.offset,
		keyword: req.query.keyword,
		sku: req.query.sku,
		count: req.query.count
	}
	orderService.orderList(orderData).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.orderDetail = (req, res) => {

	const orderId = req.query.orderId;

	orderService.orderListById(orderId).then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.totalAmount = (req, res) => {

	orderService.totalAmount().then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.orderCheckout = (req, res) => {
	let totalAmount = 0;
	let total = 0;

	const authorization = req.header('authorization');
	customerService.getProfile(authorization).then((response) => {
		_.forEach(req.body.productDetails, (product) => {
			total = product.price * product.quantity;
			totalAmount = totalAmount + total;
		})
		const orderData = {
			email: req.body.emailId,
			telephone: req.body.phoneNumber,
			shipping_address_format: req.body.shippingAddressFormat,
			shipping_address_1: req.body.shippingAddress_1,
			shipping_address_2: req.body.shippingAddress_2,
			shipping_city: req.body.shippingCity,
			shipping_company: req.body.shippingCompany,
			shipping_country: req.body.shippingCountry,
			shipping_firstname: req.body.shippingFirstName,
			shipping_lastname: req.body.shippingLastName,
			shipping_postcode: req.body.shippingPostCode,
			shipping_zone: req.body.shippingZone,
			customer_id: response.data._id,
			invoice_prefix: 'SPU',
			order_status_id: '5cbd891240b5afcf7d459821',
			total: totalAmount
		}
		orderService.orderCheckout(orderData).then((response) => {
			_.forEach(req.body.productDetails, (product) => {
				const productData = {
					order_id: response.data._id,
					product_id: product.productId,
					name: product.name,
					model: product.model,
					quantity: product.quantity,
					total: product.price * product.quantity
				}
				orderProduct.create(productData, (useerr, userres) => {
					if (useerr) {
						console.log("usererr");
					} else {
						console.log("user response");
					}
				});
			})
			return res.status(200).json({ status: 1, message: 'Check Out the product successfully And Send order detail in your mail ..!!', data: response.data });
		}).catch((error) => {
			console.log('error: ', error);
			return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
		});
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}


module.exports.myOrderList = (req, res) => {
	const authorization = req.header('authorization');
	customerService.getProfile(authorization).then((response) => {
		const orderData = {
			customer_id: response.data._id,
		}
		orderService.myOrderList(orderData).then((response) => {
			return res.status(200).json({ status: 1, message: response.message, data: response.data });
		}).catch((error) => {
			console.log('error: ', error);
			return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
		});
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}


module.exports.recentSellingProduct = (req, res) => {
	
	orderService.recentSellingProduct().then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.todayOrderCount = (req, res) => {
	
	orderService.todayOrderCount().then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.todayOrderAmount = (req, res) => {
	
	orderService.todayOrderAmount().then((response) => {
		return res.status(200).json({ status: 1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}




