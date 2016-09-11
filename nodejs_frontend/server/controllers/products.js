// this is our products.js file located at /server/controllers/products.js
// note NO  immediate function and the object that is returned

var mongoose = require('mongoose');
var populate = require('mongoose-populator');
var Product = mongoose.model('Product'); 

module.exports =  {
	getOnePage: function(req, res) {
		console.log('controllers/products show req.query.createdOnBefor',req.query.createdOnBefor);
		Product.find({  createdOn: { $lt: req.query.createdOnBefor } },   
		 	function(err, results) {
			 if(err) {
				 console.log(err);
			 } else {
				 res.json(results);
			 }
		}).limit( req.query.limit  ).sort( '-createdOn' ) 
	},
	productsAll: function(req, res) {
		console.log('controllers/products productsAll');
		Product.find({  },   
		 	function(err, results) {
			 if(err) {
				 console.log(err);
			 } else {
				 res.json(results);
			 }
		}).limit( req.query.limit  ).sort( 'name' );
	},
 	addProduct: function(req, res) {
		var newProduct = new Product( req.body);
		newProduct.save(function(err, results) {				 
			if(err){
				console.log("something went wrong with Customers 'create:'");
			} else {
				console.log('controllers/products added '+req.body.name+' to products'); 
				 res.json(results);
			 }	
		})
	}
} 