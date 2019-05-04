var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var settings = new Schema({
    settings_id:{
        type:String
    },
    url:{
        type:String
    },
    meta_tag_title:{
        type:String
    },
    meta_tag_description:{
        type:String
    },
    meta_tag_keywords:{
        type:String
    },
    store_name:{
        type:String
    },
    store_owner:{
        type:String
    },
    store_address:{
        type:String
    },
    country_id:{
        type:String
    },
    zone_id:{
        type:String
    },
    store_email:{
        type:String

    },
    store_telephone:{
        type:String
    },
    store_fax:{
        type:String
    },
    store_logo:{
        type:String
    },
    store_logo_path:{
        type:String
    },
    maintenance_mode:{
        type:String
    },
    store_language_name:{
        type:String
    },
    store_currency_id:{
        type:String
    },
    store_image:{
        type:String
    },
    store_image_path:{
        type:String
    },
    google:{
        type:String
    },
    facebook:{
        type:String
    },
    twitter:{
        type:String
    },
    instagram: {
        type:String
    },
    order_status:{
        type:String
    },
    invoice_prefix:{
        type:String
    },
    items_per_page:{
        type:String
    },
    category_product_count:{
        type:String
    },
    is_active :{
        type:String,
    },
    created_by :{
        type:String,
        Default:null
    },
    modified_by :{
        type:String,
        Default:null
    },
    created_date :{
        type: Date,
        default: Date.now,
    },
    modified_date:{
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('settings', settings,'settings');