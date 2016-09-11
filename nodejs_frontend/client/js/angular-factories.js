// FACTORY

// SETUP customerFactory
primes_n_e.factory('singleFactory', function ($http){
    // a factory is nothing more than a function that returns an object literal!
    var primes = [];
    var factory = {};
    // add a getstudents method to the object we defined
    // factory.getCustomers = function (callback){
    //  $http.get('/customers').success(function(output) {
    //      customers = output;
    //      // pass the customers to a callback to be used by whoever calls the method
    //      callback(customers);
    //  })
    // }

    factory.getSingle = function (info, callback) {
        var dataObj   = {len: info.len, ord: info.ord};
        // build separate $http.post object with specific configuration settings and post data
        var http_post = $http.post('/primedata/json', dataObj);
        // attempt json post and return data if any and status
        http_post.success(function ( responseData) {
            callback (responseData);
        });
        }

    // most important step: return the object
    return factory
});






// SETUP sysStateFactory
primes_n_e.factory('sysStateFactory', function (){
    // sysState in ['init','single','uplode']
    var sysState = {state:'init'}; 
    var factory = {};
    factory.getSysState = function (callback){
        callback(sysState);
    }
    return factory
});