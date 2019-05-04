var countryModel = require('../model/country.model');
let countryController = {};

countryController.addCountry = function(req,res){
	var country = new countryModel(req.body);

	country.save(function(err,country){
		if(err){
			res.status(500).send(err);
		}
		res.status(200).send(country);
	})
}


countryController.contryList = function(req,res){
	countryModel.find({}, function(err,country){
		if(err){
			res.status(500).send(err);
		}
		console.log(country);
		res.status(200).send(country);
	})
}

countryController.updateContry = function(req,res) {

	var contryId = req.params.id;

	countryModel.findOneAndUpdate({_id:contryId},req.body, {upsert:true, new:true}).exec((error,country)=>{
		if (error){ 
			res.status(500).send(error);
		}else{
			console.log(country);
			res.status(200).send(country);
		}
	})
}

countryController.deleteCountry = function(req,res){

	var contryId = req.params.id;


	countryModel.findOneAndRemove({_id:contryId}).exec((error,country)=>{
		if (error){ 
			res.status(500).send(error);
		}else{
			console.log(country);
			res.status(200).send(country);
		}
	})
}


module.exports.customerRepairScript = (req, res) => {
    function updateCustomer(customerData) {
        return new Promise((resolve, reject) => {
            customerData['isEmailVerified'] = false;
            customerData['forgotPasswordString'] = "";
            customerData['emailVerificationCode'] = "";
            customerData['password'] = "";
            customerData['passwordSalt'] = "";
            const _id = customerData._id;
            delete customerData._id;

            Customer
                .updateOne(
                    {
                        _id: ObjectId(_id)
                    },
                    {
                        $set: customerData
                    },
                    {
                        upsert: true
                    }
                )
                .exec((err, updated) => {
                    if (err) return reject(err);
                    return resolve(updated);
                })
        });
    };

module.exports = countryController;