var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var zone = new Schema({
	zone_id:{
		type:String,
	},
	country_id:{
		type:String,
	},
	code:{
		type:String,
	},
	name:{
		type:String,
	},
	is_active:{
		type:String,
	},
	created_date : {
		type: Date,
		default: Date.now()
	},
	modified_date:{
		type:Date,
		Default:Date.now()
	},
	created_by:{
		type:String,
		Default:null
	},
	modified_by:{
		type:String,
		Default:null
	}
});
module.exports = mongoose.model('zone', zone,'zone');