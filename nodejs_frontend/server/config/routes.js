// This is our routes.js file located in server/config/routes.js
// Defines all of our routing rules!
// We will have to require this in the server.js file (and pass needed scope(s))
module.exports = function (app, bodyParser, tools) {
    var jsonParser = bodyParser.json();
    
    // primes API routes
    // First require the controller() win vertion
    var primes = require(tools.fullWinPath('/server/controllers/primes.js'));
    // app.get('/primes', function (req, res) {
    //  primes.getPrimes(req, res);
    // });
      
    app.post('/primedata/json',jsonParser,  function (req, res){
    primes.getPrimeData(req, res);
    });


    
};