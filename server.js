var exp = require('express');
var path = require('path');
var mongoose = require('mongoose');
var customerController = require('./controller/customer.controller');
var countryController = require('./controller/country.controller');
var manufactureController = require('./controller/manufacture.controller');
var pageController = require('./controller/page.controller');
var productController = require('./controller/product.controller');
var bannerController = require('./controller/banner.controller');
var categoryController = require('./controller/category.controller');
var contactController = require('./controller/contact.controller');
var currencyController = require('./controller/currency.controller');
var mediaController = require('./controller/media.controller');
var settingController = require('./controller/settings.controller');
var zoneController = require('./controller/zone.controller');
var emailTempController = require('./controller/emailTemp.controller');
var orderStatusController = require('./controller/orderStatus.controller');

var cors = require('cors');

var bodyParser = require('body-parser');
var app = exp();
var http = require('http');
const port = 9000;
var server = app.listen(port);

mongoose.connect('mongodb://localhost:27017/spurtcommerce', {useNewUrlParser: true})
.then(() => console.log("Connected"))
.catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// //Routes for country Controller
app.post('/api/country/add-country',countryController.addCountry);
app.get('/api/country/countrylist',countryController.countryList);
app.get('/api/list/country-list',countryController.countryList);
app.put('/api/country/update-country/:id',countryController.updateCountry);
app.delete('/api/country/delete-country/:id',countryController.deleteCountry);

//Routes for Store API

app.post('/api/customer/register',customerController.register);
app.get('/api/manufacturers/manufacturerlist',manufactureController.getManufacture);
app.get('/api/pages/pagelist',pageController.getPage);
app.get('/api/list/productlist',productController.productList);

//Routes for Banner API
app.get('/api/list/banner-list',bannerController.bannerList);
app.post('/api/banner/add-banner',bannerController.addBanner);
app.delete('/api/banner/delete-banner/:id',bannerController.deleteBanner);
app.put('/api/banner/update-banner/:id',bannerController.updateBanner);
app.get('/api/product-store/featureproduct-list',productController.getfeatureproduct);

//Routes for Category API

app.get('/api/list/category-list',categoryController.categoryList);
app.delete('/api/delete-category/:id',categoryController.deleteCategory);
app.post('/api/add-category',categoryController.addCategory);
app.put('/api/update-category/:id',categoryController.updateCategory);
app.post('/api/customer/login',customerController.login);

//Routes for ContactUs API

app.post('/api/list/contact-us',contactController.addResponse);

//Routes for currency API

app.get('/api/currency/currencylist',currencyController.currencyList);
app.post('/api/currency/add-currency',currencyController.addCurrency);
app.put('/api/currency/update-currency/:id',currencyController.updateCurrency);

//Routes for Media API

app.get('/api/media/image-resize',mediaController.imageResize);
app.get('/api/product-store/productdetail/:id',productController.productDetail);

//Routes for Settings API

app.get('/api/settings/get-settings',settingController.getSetting);


//Routes for Zone API

app.get('/api/list/zone-list',zoneController.zoneList);
app.post('/api/zone/add-zone',zoneController.addZone);
app.put('/api/zone/update-zone/:id',zoneController.updateZone);
app.delete('/api/zone/delete-zone/:id',zoneController.deleteZone);

//Routes for EmailTemplate API


app.get('/api/email-template/email-templatelist',emailTempController.emailTemplateList);

app.get('/api/order/order-status',orderStatusController.orderStatusList);








