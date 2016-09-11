// This is the models.js file located at /server/models/models.js.js
// creates all schema in our controller(s)

var mongoose = require('mongoose'), 
	Schema 		= mongoose.Schema;


// ProductSchema
var ProductSchema = new mongoose.Schema({
  // PROPERTIES
	  name: String,
	  imagUrl: String,
	  description: String,
	  quantity: Number,
	  createdOn: { type: Date, default: new Date() },
  // IMPORTED DOCUMENTS
		
	// EXPORTED DOCUMENTS
		_orders: { type: Schema.ObjectId, ref: 'Order' }
});


// CustomerSchema
var CustomerSchema = new mongoose.Schema({
  name: String,
  created_at: Date,

// IMPORTED DOCUMENTS
			orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],

//EXPORTED DOCUMENTS});
});


// OrderSchema
var OrderSchema = new mongoose.Schema({
	// PROPERTIES
  //name			: String,  
  quantity	: Number,
  createOn: { type: Date, default: new Date() },
  // IMPORTED DOCUMENTS
	product: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
			
	// EXPORTED DOCUMENTS
	_customer: { type: Schema.ObjectId, ref: 'Customer' }
});


mongoose.model('Customer', CustomerSchema);
mongoose.model('Product', ProductSchema);
mongoose.model('Order', OrderSchema);
