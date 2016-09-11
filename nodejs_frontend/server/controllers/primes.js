// this is our prime.js file located at /server/controllers/prime.js
// note NO immediate function and the object that is returned

// Load primeData from file
var fs = require('fs');
var primeData = JSON.parse(fs.readFileSync('./server/datafiles/prime_n_e_12-5.json', 'utf8'));

module.exports =  {
  getPrimeData: function (req, res) {
    if(req.body.len >= 1 && req.body.len <=12 && req.body.ord >= 1 && req.body.ord <=5 ){
      var key = req.body.len + '-' + req.body.ord;
      var results = primeData[key];
      results.key = key;
      console.log("results = " + results["seq"]);
      res.json(results);
    }
    
  },
};