var country = require('../models/country.model');
var countryService = require('../services/country.service');
// npm import
const path = require('path');
const mongoose = require('mongoose');


const ObjectId = require('mongodb').ObjectId;

module.exports.countryList = (req, res) => {
	countryService.countryList().then((response) => {
		return res.status(200).json({status:1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}


module.exports.addCountry = (req, res) => {
	const body = req.body;
	countryService.addCountry(body).then((response) => {
		return res.status(200).json({status:1, message: response.message});
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.deleteCountry = (req, res) => {

	const countryid = req.params.id;
	countryService.deleteCountry(countryid).then((response) => {
		return res.status(200).json({status:1, message: response.message});
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.updateCountry = (req, res) => {

	const bannerid = req.params.id;
	const countryData ={
		title:req.body.title,
		image:req.body.image,
		content:req.body.content,
		link:req.body.link,
		position:req.body.position
	}
	countryService.updateCountry(bannerid,countryData).then((response) => {
		return res.status(200).json({status:1, message: response.message});
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}