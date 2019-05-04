var banner = require('../models/banner.model');
var bannerService = require('../services/banner.service');
// npm import
const path = require('path');
const mongoose = require('mongoose');


const ObjectId = require('mongodb').ObjectId;

module.exports.bannerList = (req, res) => {
	bannerService.bannerList().then((response) => {
		return res.status(200).json({status:1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}


module.exports.addBanner = (req, res) => {
	const body = req.body;
	bannerService.addBanner(body).then((response) => {
		return res.status(200).json({status:1, message: response.message});
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.deleteBanner = (req, res) => {

	const bannerid = req.params.id;
	bannerService.deleteBanner(bannerid).then((response) => {
		return res.status(200).json({status:1, message: response.message});
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.updateBanner = (req, res) => {

	const bannerid = req.params.id;
	const bannerData ={
		title:req.body.title,
		image:req.body.image,
		content:req.body.content,
		link:req.body.link,
		position:req.body.position
	}
	bannerService.updateBanner(bannerid,bannerData).then((response) => {
		return res.status(200).json({status:1, message: response.message});
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}