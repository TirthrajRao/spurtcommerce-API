// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');

// Database models

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.imageResize = (imageData)=> {
    console.log("imageData====>>>",imageData);
    return new Promise(function (resolve, reject) {
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + imageData.imgPath + imageData.imgName)
        console.log("directory path",directoryPath);
        var gm = require('gm').subClass({ imageMagick: true });
        return gm(directoryPath).resize(imageData.widthString,imageData.heightString).toBuffer((error, buffer)=> {
            if (error) {
                reject(error);
            }
            else {
                resolve(buffer);
            }
        });
    })
};




