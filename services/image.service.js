// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');
const multer = require('multer');
var fs = require('fs');
var _ = require('lodash');

// Static variables
const ObjectId = require('mongodb').ObjectId;

// Services

module.exports.imageResize = (imageData) => {
    return new Promise(function (resolve, reject) {
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + imageData.imgPath + imageData.imgName)
        var gm = require('gm').subClass({ imageMagick: true });
        return gm(directoryPath).resize(imageData.widthString, imageData.heightString).toBuffer((error, buffer) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(buffer);
            }
        });
    })
}

module.exports.imageUpload = (folderName, base64Image) => {

    console.log("base64----------->>>>>", base64Image);
    const directoryPath = path.join(process.cwd(), 'uploads' + '/' + folderName);
    console.log("path->>>>>>>", directoryPath);
    return new Promise((resolve, reject) => {
        fs.writeFile(directoryPath, base64Image, 'base64', (err) => {
            if (err) {
                reject(err);
            }
            resolve({ success: true });
        });
    });
}

module.exports.listFolders = (limit, folderName) => {

    return new Promise((resolve, reject) => {

        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + folderName);
        readDir(directoryPath).then((files) => {

            console.log("FIles--->>>>>>>>>>>>>>>>>", files);
            const contents = [];
            const commonPrefix = [];
            for (const file of files) {
                console.log("file--------in for>", file);
                const pathfile = path.resolve(directoryPath, file);
                console.log("pathfile------>>>>>>>", pathfile);
                const isDir = isDirCheck(pathfile);

                console.log("isDir-------->>>>>", isDir);

                if (true) {

                    commonPrefix.push({
                        Prefix: folderName ? folderName + file + '/' : file + '/',
                    });

                }
                contents.push({
                    Key: folderName ? folderName + file : file,
                });
            }

            // passsing directoryPath and callback function

            const outputResponse = {};
            outputResponse.Name = 'uploads';
            outputResponse.Prefix = folderName;
            outputResponse.Delimiter = 100;
            outputResponse.IsTruncated = 'uploads';
            outputResponse.Marker = '';
            outputResponse.Contents = contents;
            outputResponse.CommonPrefixes = commonPrefix;

            console.log("output repsonse---------->>>", outputResponse);

            resolve({ status: 200, message: 'Successfully get bucket object list', data: outputResponse });


        }).catch((error) => {
            console.log('error:----------->>>>>>>>>>> ', error);
        });
    })
}


function isDirCheck(pathfile) {
    console.log("function calling is dir check------>");
    return new Promise((subresolve, subreject) => {
        fs.stat(pathfile, (error, stat) => {
            if (stat && stat.isDirectory()) {
                console.log("in if");
                subresolve(true);

            } else {
                console.log("in");
                subresolve(false);

            }
        });
    })
}

function readDir(pathfile) {
    console.log("function calling------>");
    return new Promise((resolve, reject) => {
        fs.readdir(pathfile, (error, files) => {
            if (error) {
                console.log("Error-------->>>");
                reject(error);
            }
            console.log('files-------->>>>123', files);
            resolve(files);
        });
    })
}