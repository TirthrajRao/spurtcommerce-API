var currency = require('../models/currency.model');
var imageService = require('../services/image.service');
// npm import
const path = require('path');
const mongoose = require('mongoose');


const ObjectId = require('mongodb').ObjectId;


module.exports.imageResize = (req, res) => {

	//console.log("req",req);

	const imageData = {
		widthString : req.query.width,
		heightString : req.query.height,
		imgPath : req.query.path,
		imgName : req.query.name,
		ext : req.query.name.split('.'),
	}

	console.log("ext",imageData.ext);

	if (imageData.ext[1] === 'jpg' || imageData.ext[1] === 'jpeg' || imageData.ext[1] === 'png') {
		var val;
		console.log("image data",imageData);
		imageService.imageResize(imageData).then((response) => {
			console.log('response------------------------', response);
		}).catch((error) => {
			console.log(error);
		})
	}
}
