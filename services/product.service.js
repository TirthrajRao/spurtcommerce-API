// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');
var _ = require('lodash');


// Database models
var product = require('../models/product.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;


module.exports.getfeatureproduct = (productData) => {
    return new Promise((resolve, reject) => {

        if (productData.count == 'true') {

            product.count({ is_featured: '1' }, (productError, featureProduct) => {
                if (productError) {
                    console.log('usererror: ', productError);
                    reject({ status: 500, message: 'Internal Server Error' });
                } else {
                    resolve({ status: 200, message: 'Successfully got the complete list of products', data: featureProduct });
                }
            });
        }
        else {

            product.aggregate([
                {
                    $match: { is_featured: '1' }

                },
                {
                    $limit: productData.limit
                },
                {
                    $unwind: '$Images'
                },
                {
                    $lookup: {
                        from: 'product_image',
                        localField: 'Images',
                        foreignField: '_id',
                        as: 'Images'
                    }
                },
                {
                    $unwind: '$Images'

                },
                {
                    $project: {
                        Images: {
                            _id: '$Images._id',
                            image: '$Images.image',
                            containerName: '$Images.container_name',
                            defaultImage: '$Images.default_image',
                        },
                        productId: '$_id',
                        Category: 1,
                        sku: 1,
                        quantity: 1,
                        description: 1,
                        minimumQuantity: 1,
                        subtractStock: 1,
                        stockStatusId: 1,
                        manufacturerId: 1,
                        shipping: 1,
                        price: 1,
                        dateAvailable: 1,
                        sortOrder: 1,
                        name: 1,
                        metaTagTitle: 1,
                        condition: 1,
                        isActive: 1,
                        location: 1,
                    }

                },
                {
                    $group: {
                        _id: '$_id',
                        productId: {
                            $first: '$productId',
                        },
                        sku: {
                            $first: '$sku',
                        },
                        Images: {
                            $first: '$Images',
                        },
                        Category: {
                            $first: '$Category',
                        },
                        location: {
                            $first: '$location'
                        },
                        quantity: {
                            $first: '$quantity'
                        },
                        description: {
                            $first: '$description'
                        },
                        minimumQuantity: {
                            $first: '$minimumQuantity'
                        },
                        subtractStock: {
                            $first: '$subtractStock'
                        },
                        stockStatusId: {
                            $first: '$stockStatusId'
                        },
                        manufacturerId: {
                            $first: '$manufacturerId'
                        },
                        shipping: {
                            $first: '$shipping'
                        },
                        price: {
                            $first: '$price'
                        },
                        dateAvailable: {
                            $first: '$dateAvailable'
                        },
                        sortOrder: {
                            $first: '$sortOrder'
                        },
                        name: {
                            $first: '$name'
                        },
                        metaTagTitle: {
                            $first: '$metaTagTitle'
                        },
                        condition: {
                            $first: '$condition'
                        },
                        isActive: {
                            $first: '$isActive'
                        }

                    }
                }

            ]).exec(function (error, productDetail) {
                if (error) {
                    return reject(error);
                } else {
                    return resolve({ status: 200, message: 'Successfully get productDetail', data: productDetail });
                }
            })
        }
    })
}



module.exports.productDetail = (productId) => {
    return new Promise((resolve, reject) => {
        console.log('productId: ', productId)
        product.aggregate([
            {
                $match: { '_id': ObjectId(productId) }
            },
            //Using Match Find By Id
            {
                $unwind: '$Images',
            },
            {
                $lookup: {
                    from: 'product_image',
                    localField: 'Images',
                    foreignField: '_id',
                    as: 'productImage'
                }
            },
            //Lookup of Product Image
            {
                $unwind: '$productImage'
            },
            {
                $project: {
                    product_image: {
                        productImageId: '$productImage._id',
                        image: '$productImage.image',
                        containerName: '$productImage.container_name',
                        defaultImage: '$productImage.default_image',
                    },
                    product_id: 1,
                    Category: 1,
                    sku: 1,
                    quantity: 1,
                    description: 1,
                    minimumQuantity: 1,
                    subtractStock: 1,
                    stockStatusId: 1,
                    manufacturerId: 1,
                    shipping: 1,
                    price: 1,
                    dateAvailable: 1,
                    sortOrder: 1,
                    name: 1,
                    metaTagTitle: 1,
                    condition: 1,
                    isActive: 1,
                    location: 1
                }
            },
            // // //Reduce To Limited Data Using Project
            {
                $group: {
                    _id: '$_id',
                    product_id: {
                        $first: '$product_id',
                    },
                    sku: {
                        $first: '$sku',
                    },
                    productImage: {
                        $push: '$product_image',
                    },
                    Category: {
                        $first: '$Category',
                    },
                    location: {
                        $first: '$location'
                    },
                    quantity: {
                        $first: '$quantity'
                    },
                    description: {
                        $first: '$description'
                    },
                    minimumQuantity: {
                        $first: '$minimumQuantity'
                    },
                    subtractStock: {
                        $first: '$subtractStock'
                    },
                    stockStatusId: {
                        $first: '$stockStatusId'
                    },
                    manufacturerId: {
                        $first: '$manufacturerId'
                    },
                    shipping: {
                        $first: '$shipping'
                    },
                    price: {
                        $first: '$price'
                    },
                    dateAvailable: {
                        $first: '$dateAvailable'
                    },
                    sortOrder: {
                        $first: '$sortOrder'
                    },
                    name: {
                        $first: '$name'
                    },
                    metaTagTitle: {
                        $first: '$metaTagTitle'
                    },
                    condition: {
                        $first: '$condition'
                    },
                    isActive: {
                        $first: '$isActive'
                    }
                }
            },
            // //Group To Generate Single Document to Multiple

            {
                $unwind: '$Category',
            },
            // //Unwind Category To Create Single Object From Array
            {
                $lookup: {
                    from: 'category',
                    localField: 'Category',
                    foreignField: '_id',
                    as: 'Category'
                }
            },
            // //Lookup Of Product Category
            {
                $unwind: '$Category'
            },
            {
                $project: {
                    Category: {
                        categoryId: '$Category._id',
                        categoryName: '$Category.name',
                    },
                    productImage: 1,
                    sku: 1,
                    quantity: 1,
                    description: 1,
                    minimumQuantity: 1,
                    subtractStock: 1,
                    stockStatusId: 1,
                    manufacturerId: 1,
                    shipping: 1,
                    price: 1,
                    dateAvailable: 1,
                    sortOrder: 1,
                    name: 1,
                    metaTagTitle: 1,
                    condition: 1,
                    isActive: 1,
                    location: 1

                }
            },
            //Project To Reduce Category Data to Limited 
            {
                $group: {
                    _id: '$_id',
                    sku: {
                        $first: '$sku',
                    },
                    location: {
                        $first: '$location'
                    },
                    quantity: {
                        $first: '$quantity'
                    },
                    description: {
                        $first: '$description'
                    },
                    minimumQuantity: {
                        $first: '$minimumQuantity'
                    },
                    subtractStock: {
                        $first: '$subtractStock'
                    },
                    stockStatusId: {
                        $first: '$stockStatusId'
                    },
                    manufacturerId: {
                        $first: '$manufacturerId'
                    },
                    shipping: {
                        $first: '$shipping'
                    },
                    price: {
                        $first: '$price'
                    },
                    dateAvailable: {
                        $first: '$dateAvailable'
                    },
                    sortOrder: {
                        $first: '$sortOrder'
                    },
                    name: {
                        $first: '$name'
                    },
                    metaTagTitle: {
                        $first: '$metaTagTitle'
                    },
                    condition: {
                        $first: '$condition'
                    },
                    isActive: {
                        $first: '$isActive'
                    },

                    productImage: {
                        $first: '$productImage'
                    },
                    Category: {
                        $push: '$Category'
                    },
                }
            }
            //Group To Generate Single Document Form Multiple Output Document

        ]).exec(function (error, productDetail) {
            if (error) {
                return reject(error);
            } else {
                return resolve({ status: 200, message: 'Successfully get productDetail', data: productDetail });
            }
        })
    })
}


module.exports.addProduct = (productData) => {
    console.log("Product Data in service------->", productData);
    return new Promise((resolve, reject) => {
        product.create(productData, (useerr, userres) => {
            if (productError) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully created new product.', data: userres });
            }
        });
    })
}


module.exports.productList = (productData) => {
    return new Promise((resolve, reject) => {
        if (productData.count == 'true' || productData.count == 1) {
            product.count((productError, newProduct) => {
                if (productError) {
                    console.log('usererror: ', productError);
                    reject({ status: 500, message: 'Internal Server Error' });
                } else {
                    resolve({ status: 200, message: 'Successfully created new product.', data: newProduct });
                }
            });

        }
        else {

            product.aggregate([
                {
                    $unwind: '$Images',
                },
                {
                    $lookup: {
                        from: 'product_image',
                        localField: 'Images',
                        foreignField: '_id',
                        as: 'productImage'
                    }
                },
                //Lookup of Product Image
                {
                    $unwind: '$productImage'
                },
                {
                    $project: {
                        product_image: {
                            productImageId: '$productImage._id',
                            image: '$productImage.image',
                            containerName: '$productImage.container_name',
                            defaultImage: '$productImage.default_image',
                        },
                        Category: 1,
                        sku: 1,
                        quantity: 1,
                        description: 1,
                        minimumQuantity: 1,
                        subtractStock: 1,
                        stockStatusId: 1,
                        manufacturerId: 1,
                        shipping: 1,
                        price: 1,
                        dateAvailable: 1,
                        sortOrder: 1,
                        name: 1,
                        metaTagTitle: 1,
                        condition: 1,
                        isActive: 1,
                        location: 1,
                    }
                },
                //Reduce To Limited Data Using Project
                {
                    $group: {
                        _id: '$_id',
                        product_id: {
                            $first: '$product_id',
                        },
                        sku: {
                            $first: '$sku',
                        },
                        productImage: {
                            $first: '$product_image',
                        },
                        Category: {
                            $first: '$Category',
                        },
                        location: {
                            $first: '$location'
                        },
                        quantity: {
                            $first: '$quantity'
                        },
                        description: {
                            $first: '$description'
                        },
                        minimumQuantity: {
                            $first: '$minimumQuantity'
                        },
                        subtractStock: {
                            $first: '$subtractStock'
                        },
                        stockStatusId: {
                            $first: '$stockStatusId'
                        },
                        manufacturerId: {
                            $first: '$manufacturerId'
                        },
                        shipping: {
                            $first: '$shipping'
                        },
                        price: {
                            $first: '$price'
                        },
                        dateAvailable: {
                            $first: '$dateAvailable'
                        },
                        sortOrder: {
                            $first: '$sortOrder'
                        },
                        name: {
                            $first: '$name'
                        },
                        metaTagTitle: {
                            $first: '$metaTagTitle'
                        },
                        condition: {
                            $first: '$condition'
                        },
                        isActive: {
                            $first: '$isActive'
                        },
                    }
                },
                //Group To Generate Single Document to Multiple

                {
                    $unwind: '$Category',
                },
                //Unwind Category To Create Single Object From Array
                {
                    $lookup: {
                        from: 'category',
                        localField: 'Category',
                        foreignField: '_id',
                        as: 'Category'
                    }
                },
                //Lookup Of Product Category
                {
                    $unwind: '$Category'
                },
                {
                    $project: {
                        Category: {
                            categoryId: '$Category._id',
                            categoryName: '$Category.name',
                        },
                        productImage: 1,
                        sku: 1,
                        quantity: 1,
                        description: 1,
                        minimumQuantity: 1,
                        subtractStock: 1,
                        stockStatusId: 1,
                        manufacturerId: 1,
                        shipping: 1,
                        price: 1,
                        dateAvailable: 1,
                        sortOrder: 1,
                        name: 1,
                        metaTagTitle: 1,
                        condition: 1,
                        isActive: 1,
                        location: 1,

                    }
                },
                //Project To Reduce Category Data to Limited 
                {
                    $group: {
                        _id: '$_id',
                        sku: {
                            $first: '$sku',
                        },
                        location: {
                            $first: '$location'
                        },
                        quantity: {
                            $first: '$quantity'
                        },
                        description: {
                            $first: '$description'
                        },
                        minimumQuantity: {
                            $first: '$minimumQuantity'
                        },
                        subtractStock: {
                            $first: '$subtractStock'
                        },
                        stockStatusId: {
                            $first: '$stockStatusId'
                        },
                        manufacturerId: {
                            $first: '$manufacturerId'
                        },
                        shipping: {
                            $first: '$shipping'
                        },
                        price: {
                            $first: '$price'
                        },
                        dateAvailable: {
                            $first: '$dateAvailable'
                        },
                        sortOrder: {
                            $first: '$sortOrder'
                        },
                        name: {
                            $first: '$name'
                        },
                        metaTagTitle: {
                            $first: '$metaTagTitle'
                        },
                        condition: {
                            $first: '$condition'
                        },
                        isActive: {
                            $first: '$isActive'
                        },

                        productImage: {
                            $first: '$productImage'
                        },
                        Category: {
                            $push: '$Category'
                        },
                    }
                }
                //Group To Generate Single Document Form Multiple Output Document

            ])
                .exec(function (error, productDetail) {
                    if (error) {
                        return reject(error);
                    } else {
                        console.log('productDetail: ', productDetail);
                        return resolve({ status: 200, message: 'Successfully get product list', data: productDetail });
                    }
                })
        }
    })

}


module.exports.addProduct = (productData) => {
    console.log("Product Data in service------->", productData);
    return new Promise((resolve, reject) => {
        product.create((productError, newProduct) => {
            if (productError) {
                console.log('usererror: ', productError);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully created new product.', data: newProduct });
            }
        });
    })
}


module.exports.topSellingProduct = (productData) => {
    return new Promise((resolve, reject) => {
        product.aggregate([
            {
                $limit: 4
            },
            {
                $project: {
                    'product._id': '$product_id' ,
                    'product.name':'$name',
                    'product.description':'$description',
                    'product.price':'$price',
                    'product.Images':'$Images',
                }
            },
            {
                $lookup: {
                    from: 'product_image',
                    localField: 'product.Images',
                    foreignField: '_id',
                    as: 'productImage'
                }
            },
            {
                $project: {
                    productImage: {
                        _id: '$productImage._id',
                        image: '$productImage.image',
                        containerName: '$productImage.container_name',
                        defaultImage: '$productImage.default_image',
                    },
                    product: 1,
                }

            },
        ]).exec(function (error, topSelling) {
            if (error) {
                return reject(error);
            } else {
                return resolve({ status: 200, message: 'Successfully get product list', data: topSelling });
            }
        })

    })
}


module.exports.updateProduct = (productId, productData) => {
    console.log("Product Data in service------->", productData);
    return new Promise((resolve, reject) => {
        product.findByIdAndUpdate({ _id: productId }, productData, { upsert: true }, (productError, updateProduct) => {
            if (productError) {
                console.log('usererror: ', productError);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully updated product.', data: updateProduct });
            }
        });
    })
}


module.exports.deleteProduct = (productId) => {
    console.log("Product Data in service------->", productId);
    return new Promise((resolve, reject) => {
        product.findByIdAndRemove({ _id: productId }, (productError, deleteProduct) => {
            if (productError) {
                console.log('usererror: ', useerr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully deleted Product.', data: deleteProduct });
            }
        });
    })
}


module.exports.updateFeatureProduct = (productId, productData) => {
    console.log("Product Data in service------->", productId);
    return new Promise((resolve, reject) => {
        product.findByIdAndUpdate({ _id: productId }, productData, { upsert: true }, (productError, updateProduct) => {
            if (productError) {
                console.log('usererror: ', productError);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully updated product.', data: updateProduct });
            }
        });
    })
}
