var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var country = new Schema({

	name: String,
	iso_code_2:String,
	iso_code_3:String,
	address_format:String,
	postcode_required:String,
	is_active:String,
	created_date:Date,
    modified_date:Date,
    created_by:String,
    modified_by:String,
});
module.exports = mongoose.model('country', country,'country');