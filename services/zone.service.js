// Npm modules
const mongoose = require('mongoose');
const path = require('path');
const Url = require('url');

// Database models
var zone = require('../models/zone.model');

// Static variables
const ObjectId = require('mongodb').ObjectId;


module.exports.zoneList = ()=> {
    return new Promise((resolve, reject) => {
        zone.find((zoneErr, zoneList) => {
            if (zoneErr) {
                console.log('zoneError: ', zoneErr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully get all zone List', data: zoneList });
            }
        });
    })
}

module.exports.addZone = (zoneData)=> {
  
    return new Promise((resolve, reject) => {
        zone.create(zoneData, (zoneErr, zoneResponse) => {
            if (zoneErr) {
                console.log('zoneError: ', zoneErr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully created new zone.', data: zoneResponse });
            }
        });
    })
}

module.exports.deleteZone = (zoneId)=> {
    return new Promise((resolve, reject) => {
        zone.findOneAndRemove({_id:zoneId}, (zoneErr, deletedZone) => {
            if (zoneErr) {
                console.log('zoneError: ', zoneErr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully deleted Zone.', data: deletedZone });
            }
        });
    })
}

module.exports.updateZone = (zoneId,zoneData)=> {
        
    return new Promise((resolve, reject) => {
        zone.findOneAndUpdate({_id:zoneId},zoneData,{upsert:true},(zoneErr, updatedZone) => {
            if (zoneErr) {
                console.log('zoneError: ', zoneErr);
                reject({ status: 500, message: 'Internal Server Error' });
            } else {
                resolve({ status: 200, message: 'Successfully updated Zone.', data: updatedZone });
            }
        });
    })
}




