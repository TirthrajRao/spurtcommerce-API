var mongoose = require('mongoose');

var customer = new mongoose.Schema({

	first_name:String,
	last_name :String,
	username :String,
	email :String,
	password :String,
	mobile :String,
	address :String,
	country_id :String,
	city :String,
	pincode :Number,
	avatar :String,
	avatar_path :String,
	mail_status :String,
	delete_flag :String,
	customer_group_id : String,
	last_login :Date,
	newsletter : String,
	safe : String,
	ip :String,
	zone_id : String,
	is_active:String,
	created_by : String,
	modified_by : String,
	created_date :Date,
	modified_date :Date
});

module.exports = mongoose.model('customer', customer,'customer');