var currency = require('../models/currency.model');
var imageService = require('../services/image.service');
// npm import
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');



const ObjectId = require('mongodb').ObjectId;


module.exports.imageResize = (req, res) => {

	//console.log("req",req);

	const imageData = {
		widthString: req.query.width,
		heightString: req.query.height,
		imgPath: req.query.path,
		imgName: req.query.name,
		ext: req.query.name.split('.'),
	}

	if (imageData.ext[1] === 'jpg' || imageData.ext[1] === 'jpeg' || imageData.ext[1] === 'png') {
		var val;
		imageService.imageResize(imageData).then((response) => {
			return res.send(response);
		}).catch((error) => {
			console.log(error);
		})
	}
}

// module.exports.uploadFile = (req,res)=>{

// 	let storage = multer.diskStorage({
//         destination: function(req, file, cb) {
// 			console.log("files--------->>>>>>",file);
//             cb(null, './uploads/')
// 		},
//         filename: function(req, file, cb) {
// 			let ext = '';
// 			if (file.originalname.split(".").length>1) // checking if there is an extension or not.
//             ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);

//             cb(null, file.fieldname + '_' + Date.now()+ext)
//         }
//     })
//     let upload = multer({ storage: storage }).single('img');

//     upload(req, res, (err) => {
// 		if (err) return res.send({ err: err });
// 		console.log("req.file",req.file);
//         res.send({ name: req.body.name, file: req.file });
//     })
// }


module.exports.getBucketList = (req, res) => {

	const limit = req.body.limit;
	console.log("123==============================>>>",req.query.folderName);
	if (req.query.folderName) {
		console.log("In if condtion");
		const folderName = req.query.folderName;

		imageService.listFolders(limit, folderName).then((response) => {
			return res.status(200).json({ status: 1, message: response.message, data: response.data });
		}).catch((error) => {
			console.log('error: ', error);
			return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
		});
	}
	else {
		const folderName = "";
		imageService.listFolders(limit, folderName)
		.then((response) => {
			return res.status(200).json({ status: 1, message: response.message, data: response.data });
		})
		.catch((error) => {
			console.log('error: ', error);
			return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
		});
	}
}





