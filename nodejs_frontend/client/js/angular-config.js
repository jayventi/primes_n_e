// // CONFIG and UTILITYS

// SETUP main angular module
var primes_n_e = angular.module('primes_n_e', ['ngRoute']);

// SETUP utilitys


// SETUP route provider
primes_n_e.config(function ($routeProvider) {
    $routeProvider
        .when('/',{
                templateUrl: 'partials/viewPrimes.html' // our default
        })
        .when('/partialUpload',{
             templateUrl: 'partials/viewUploadSet.html'
        })
        .otherwise({
            redirectTo: '/'
    });
});