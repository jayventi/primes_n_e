// this is our orders.js file located at /server/orders/orders.js
// note NO immediate function 

var mongoose = require('mongoose'),
	Customer	= mongoose.model('Customer'),
	Order 		= mongoose.model('Order'),
	Product		= mongoose.model('Product');

var populate = require('mongoose-populator');

module.exports =  {
	getOrders: function (req, res) {
		 Order.find({}).exec( function (err, orders) {
			populate(orders, '_customer product', function (err, populatedOrders){
				if(err) {
					console.log(err);
				} else {
					res.json(populatedOrders);
				}
			});
		});
	},
	getOneOrderPage : function(req, res) {
		console.log('controllers/orders show req.query.createdOnBefor',
			req.query.createdOnBefor);
		Order.find({  createOn: { $lt: req.query.createdOnBefor } },   
			function (err, orders) {
			populate(orders, '_customer product', function (err, populatedOrders){
				if(err) {
					console.log(err);
				} else {
					console.log('controllers/orders populatedOrders.length',populatedOrders.length);		
				 res.json(populatedOrders);
			 }
			}); // end populate()
		}).limit( req.query.limit  ).sort( '-createOn' ) // end Order.find
	},
	addOrder: function(req, res) {
		//console.log('addOrder req.body',req.body);
		var customerToUpdate = {};
		Customer.findOne({ _id: req.body._customer }, function (err, customer){
			//console.log('Customer.findOne > customer',customer);
			var newOrder = new Order({
				product		: req.body.product, 
				quantity	: req.body.quantity,  
				_customer : req.body._customer 
			});
			// save new onder and save/populate Customer
			newOrder.save(function (err, resultsOrder) {
				//console.log('err',err)
				customer.save( function (err, resultsCustomer){
					populate(resultsOrder, '_customer product', function (err, populatedResults){
						if(err){
							console.log("something went wrong with Customers 'create:'");
						} else {
							console.log('addOrder>no err> populatedResults.length:',populatedResults.length);
							res.json(populatedResults);
						}		
					});
				});
			});
		});	
	},
} 