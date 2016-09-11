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
    // app.get('/primePage', function (req, res) {
    //  primes.getPrimeData(req, res);
    // });  
    app.post('/primedata/json',jsonParser,  function (req, res){
    primes.getPrimeData(req, res);
    });


    // // orders API routes
    // // First require the controller() win vertion
    // // Win path fix ok
    // var orders = require(tools.fullWinPath('/server/controllers/orders.js'));
    // app.get('/orders', function (req, res) {
    //  orders.getOrders(req, res);
    // });  
    // app.get('/ordersPage', function (req, res) {
    //  orders.getOneOrderPage(req, res);
    // });
    // app.post('/addOrder/json',jsonParser, function (req,res){
    //    orders.addOrder(req, res);
    // });
    
};