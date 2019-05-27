var customerWishList = require('../services/customerwishlist.service');
var customerService = require('../services/customer.service');
// npm import
const path = require('path');
const mongoose = require('mongoose');


const ObjectId = require('mongodb').ObjectId

module.exports.addProductToWishList = (req, res) => {

    const authorization = req.header('authorization');
    customerService.getProfile(authorization).then((response) => {
        const productData = {
            product_id: req.body.productId,
            customer_id: response.data._id,
        }
        console.log("product Data in controller", productData);
        customerWishList.addProductToWishList(productData).then((response) => {
            return res.status(200).json({ status: 1, message: response.message });
        }).catch((error) => {
            console.log('error: ', error);
            return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
        });

    }).catch((error) => {
        console.log('error: ', error);
        return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
    });
}


module.exports.getWishList = (req, res) => {



    const authorization = req.header('authorization');
    customerService.getProfile(authorization).then((response) => {
        const wishList = {
            count: req.query.count,
            customer_id: response.data._id
        }

        console.log("Wishlist Data=======>>>>>>>",wishList);

        customerWishList.getWishList(wishList).then((response) => {
            return res.status(200).json({ status: 1, message: response.message, data: response.data });
        }).catch((error) => {
            console.log('error: ', error);
            return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
        });

    }).catch((error) => {
        console.log('error: ', error);
        return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
    });
}


module.exports.removeProductFromWishList = (req, res) => {

    const wishListId = req.params.id;

    customerWishList.removeProductFromWishList(wishListId).then((response) => {
        return res.status(200).json({ status: 1, message: response.message, data: response.data });
    }).catch((error) => {
        console.log('error: ', error);
        return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'Internal Server Error' });
    });
}



