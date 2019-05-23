var mongoose = require('mongoose');

var manufacturer = new mongoose.Schema({

    name :{
    	type:String
    },
    image :{
    	type:String
    },
    image_path :{
    	type:String
    },
    sort_order :{
    	type:String
    },
    is_active :{
    	type:String
    },
    created_by :{
    	type:String,
    	default:null
    },
    modified_by :{
    	type:String,
    	default:null
    },
    created_date :{
    	type:Date,
    	default:Date.now()
    },
    modified_date :{
    	type:Date,
    	default:Date.now()
    }
});

module.exports = mongoose.model('manufacturer', manufacturer,'manufacturer');