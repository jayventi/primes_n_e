// this is our customers.js file located at /server/controllers/customers.js
// note NO  immediate function and the object that is returned


var fs = require('fs');
var primeData = JSON.parse(fs.readFileSync('./server/datafiles/prime_n_e_12-5.json', 'utf8'));

module.exports =  {
  // getCustomer: function (req, res) {     
  //    Customer.find({}, function(err, results){
  //      if(err) {
  //        console.log(err);
  //      } else {
  //        res.json(results);
  //      }
  //    })
  // } ,  
  // getOneCustPage: function(req, res) {
  //   console.log('controllers/customer show req.query.createdOnBefor',
  //     req.query.createdOnBefor);
  //   Customer.find({  created_at: { $lt: req.query.createdOnBefor } },   
  //     function(err, results) {
  //      if(err) {
  //        console.log(err);
  //      } else {
  //        console.log('controllers/customer results',results);
  //        res.json(results);
  //      }
  //   }).limit( req.query.limit  ).sort( '-created_at' ) 
  // },  
  getPrimeData: function (req, res) {
    if(req.body.len >= 1 && req.body.len <=12 && req.body.ord >= 1 && req.body.ord <=5 ){
      var key = req.body.len + '-' + req.body.ord;
      var results = primeData[key];
      console.log('primes/getPrimeData show key',
         key);
      
      console.log("results = " + results["seq"]);
      res.json(results);
    }
    // var newCustomers = new Customer({name: req.body.name, 
    // created_at: req.body.created_at});
    // newCustomers.save(function (err, results){
    //   if(err){
    //     console.log("something went wrong with Customers 'create:'");
    //   } else {
    //     console.log("server create newCustomers name: ", results.name);
    //       res.json(results);
    //   }
  } ,
};