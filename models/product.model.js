var mongoose = require('mongoose');

var product = new mongoose.Schema({

    sku:String,
    upc:String,
    quantity:String,
    stock_status_id:String,
    image :String,
    image_path :String,
    manufacturer_id :String,
    shipping :String,
    price :String,
    date_available :String,
    sort_order :String,
    name :String,
    description :String,
    amount :String,
    meta_tag_title :String,
    meta_tag_description :String,
    meta_tag_keyword :String,
    discount : String,
    subtract_stock :String,
    minimum_quantity :String,
    location :String,
    wishlist_status :String,
    delete_flag :String,
    is_featured :String,
    rating :String,
    condition :String,
    is_active : String,
    created_by : String,
    modified_by : String,
    created_date :Date,
    modified_date : Date,
    Images : [
    { type: mongoose.Schema.Types.ObjectId, 
        ref: 'product_image'
    }],
     Category : [
    { type: mongoose.Schema.Types.ObjectId, 
        ref: 'categoty'
    }],
    createdDate : Date,
    dateAvailable :Date,
    deleteFlag: String,
    isActive:String,
    manufacturerId:String,
    metaTagTitle:String,
    minimumQuantity :String,
    modifiedDate : Date,
    sortOrder :String,
    stockStatusId:String,
    subtractStock:String,
    wishListStatus :String
});

module.exports = mongoose.model('product', product,'product');