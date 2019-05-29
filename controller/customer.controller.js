var customer = require('../models/customer.model');
var login = require('../models/loginlog.model');
var customerService = require('../services/customer.service');
// npm import
const path = require('path');
const mongoose = require('mongoose');

// Static variables
const ObjectId = require('mongodb').ObjectId;

module.exports.register = (req, res) => {

	const customerData = {
		username: req.body.emailId,
		email: req.body.emailId,
		first_name: req.body.name,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		mobile: req.body.phoneNumber
	}
	customerService.registerCustomer(customerData).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}


module.exports.login = (req, res) => {
	const customerData = {
		email: req.body.emailId,
		password: req.body.password,
	}
	console.log("customer Data", customerData);
	customerService.login(customerData).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data, status: 1 });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.updateAddress = (req, res) => {
	const customerId = req.params.id;
	const addressData = {
		address1: req.body.address1,
		address2: req.body.address2,
		city: req.body.city,
		state: req.body.state,
		postcode: req.body.postcode,
		addressType: req.body.addressType
	}
	console.log("customer Address Data", addressData);
	customerService.updateAddress(customerId, addressData).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.updateCustomer = (req, res) => {
	const customerId = req.params.id;
	const customerData = {
		username: req.body.username,
		first_name: req.body.username,
		email: req.body.email,
		mobileNumber: req.body.mobileNumber,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		avatar: req.body.avatar,
		newsletter: req.body.newsletter,
		mailStatus: req.body.mailStatus,
		status: req.body.state
	}
	console.log("customer Data", customerData);
	customerService.updateCustomer(customerId, customerData).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.customerList = (req, res) => {
	const customerData = {
		customerGroup: req.query.customerGroup,
		date: req.query.date,
		email: req.query.email,
		name: req.query.name,
		limit: parseInt(req.query.limit),
		offset: parseInt(req.query.offset),
		count: req.query.count,
		status: req.query.status,
	}
	console.log("customer Data", customerData);
	customerService.customerList(customerData).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.getProfile = (req, res) => {
	const authorization = req.header('authorization');
	customerService.getProfile(authorization).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}


module.exports.deleteCustomer = (req, res) => {
	const customerId = req.params.id;
	customerService.deleteCustomer(customerId)
		.then((response) => {
			return res.status(200).json({ message: response.message, data: response.data });
		})
		.catch((error) => {
			console.log('error: ', error);
			return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
		});
}

module.exports.addCustomer = (req, res) => {

	const customerData = {
		username: req.body.username,
		email: req.body.email,
		mobileNumber: req.body.mobileNumber,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		avatar: req.body.avatar,
		newsletter: req.body.newsletter,
		mailStatus: req.body.mailStatus,
		status: req.body.status,
	}

	console.log("customer Data", customerData);
	customerService.addCustomer(customerData).then((response) => {
		return res.status(200).json({ message: response.message, status: "1" });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}


module.exports.customerDetails = (req, res) => {
	const customerId = req.params.id;
	customerService.customerDetails(customerId).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data, status: 1 });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}


module.exports.addAddress = (req, res) => {

	const addressData = {
		address_1: req.body.address1,
		address_2: req.body.address2,
		address_type: req.body.addressType,
		city: req.body.city,
		customer_id: req.body.customerId,
		postcode: req.body.postcode,
		state: req.body.state
	}

	console.log("customer Data", addressData);
	customerService.addAddress(addressData).then((response) => {
		return res.status(200).json({ message: response.message, status: "1" });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.addressList = (req, res) => {

	const customerId = req.params.id;

	customerService.addressList(customerId).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data, status: 1 });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.updateAddressById = (req, res) => {

	const addressData = {
		address_1: req.body.address1,
		address_2: req.body.address2,
		address_type: req.body.addressType,
		city: req.body.city,
		customer_id: req.body.customerId,
		postcode: req.body.postcode,
		state: req.body.state
	}

	const addressId = req.body.addressId;

	console.log("customer Data", addressData);
	customerService.updateAddressById(addressId, addressData).then((response) => {
		return res.status(200).json({ message: response.message, status: "1" });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.deleteAddress = (req, res) => {

	const addressId = req.params.id;

	customerService.deleteAddress(addressId).then((response) => {
		return res.status(200).json({ message: response.message, data: response.data, status: 1 });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.editProfile = (req, res) => {

	const authorization = req.header('authorization');
	customerService.getProfile(authorization).then((response) => {

		let customerId = response.data._id;
	
		const userData = {
			address: req.body.address,
			country_id: req.body.countryId,
			email: req.body.emailId,
			first_name: req.body.firstName,
			last_name: req.body.lastName,
			mobile: req.body.phoneNumber,
			pincode: req.body.pincode,
			zone_id: req.body.zoneId,
		}
		customerService.editProfile(customerId,userData).then((response) => {
			return res.status(200).json({ message: response.message, data: response.data, status: 1 });
		}).catch((error) => {
			console.log('error: ', error);
			return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
		});


	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}


module.exports.loginLogList = (req, res) => {
	customerService.loginLogList().then((response) => {
		return res.status(200).json({ message: response.message, data: response.data, status: 1 });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.changePassword = (req, res) => {

	const authorization = req.header('authorization');
	customerService.getProfile(authorization).then((response) => {

		const userData = {
			newPassword: req.body.newPassword,
			oldPassword: req.body.oldPassword,
		}

		let customerId = response.data._id;

		customerService.changePassword(customerId,userData).then((response) => {
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









