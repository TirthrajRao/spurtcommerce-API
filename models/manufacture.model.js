var mongoose = require('mongoose');

var manufacturer = new mongoose.Schema({

    name :String,
    image :String,
    image_path :String,
    sort_order :String,
    is_active : String,
    created_by : String,
    modified_by : String,
    created_date : Date,
    modified_date : Date
});

module.exports = mongoose.model('manufacturer', manufacturer,'manufacturer');