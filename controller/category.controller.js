var category = require('../models/category.model');
var categoryService = require('../services/category.service');
// npm import
const path = require('path');
const mongoose = require('mongoose');


const ObjectId = require('mongodb').ObjectId;

module.exports.categoryList = (req, res) => {
	categoryService.categoryList().then((response) => {
		return res.status(200).json({status:1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.deleteCategory = (req, res) => {
	const categoryId = req.params.id;
	categoryService.deleteCategory(categoryId).then((response) => {
		return res.status(200).json({status:1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.addCategory = (req, res) => {

	const categoryData ={
		name:req.body.name,
		image:req.body.image,
		parentInt:req.body.parentInt,
		sortOrder:req.body.sortOrder,
		meta_tag_title:req.body.metaTagTitle,
		meta_tag_description :req.body.metaTagDescription,
		meta_tag_keyword :req.body.metaTagKeyword,
	}
	
	categoryService.addCategory(categoryData).then((response) => {
		return res.status(200).json({status:1, message: response.message, data: response.data });
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}

module.exports.updateCategory = (req, res) => {

	const categoryId = req.params.id;

	const categoryData ={
		name:req.body.name,
		image:req.body.image,
		parentInt:req.body.parentInt,
		sortOrder:req.body.sortOrder,
		meta_tag_title:req.body.metaTagTitle,
		meta_tag_description :req.body.metaTagDescription,
		meta_tag_keyword :req.body.metaTagKeyword,
	}
	
	categoryService.updateCategory(categoryId,categoryData).then((response) => {
		return res.status(200).json({status:1, message: response.message});
	}).catch((error) => {
		console.log('error: ', error);
		return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
	});
}




