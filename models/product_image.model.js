var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product_image = new Schema({
	product_id:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'product'
	},
	image:{
		type:String,
	},
	container_name:{
		type:String,
	},
	default_image:{
		type:String,
	},
	sort_order:{
		type:String,
	},
	is_active:{
		type:String,
	},
	created_by:{
		type:String,
		Default:null
	},
	modified_by:{
		type:String,
		Default:null
	},
	created_date : {
		type: Date,
		default: Date.now()
	},
	modified_date:{
		type:Date,
		Default:Date.now()
	},
});
module.exports = mongoose.model('product_image', product_image,'product_image');