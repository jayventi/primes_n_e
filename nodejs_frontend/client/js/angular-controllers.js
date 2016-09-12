//CONTROLLERS


// SETUP topMenuController
primes_n_e.controller('topMenuController', function ($scope, sysStateFactory ){
        // inject $scope.sysState at root scope
        $scope.sysState ={};
            sysStateFactory.getSysState(function (data){
                $scope.sysState = data;
            });
});


// SETUP singleController
primes_n_e.controller('singleController',
    function ($scope, singleFactory, sysStateFactory){
    $scope.primes = [];

    // setup sysState 
    $scope.sysState = {};
    sysStateFactory.getSysState(function (data){
        $scope.sysState = data;
    });
    $scope.sysState.state = 'single';

    $scope.getSingle = function (){
        // now use singleFactory.getSingle         
        singleFactory.getSingle($scope.getPrime, function (responseData){
            console.log('> ... RETURNED FROM FACTORY AFTER getSingle');
            $scope.primes = [];
            $scope.primes.push(responseData);
        });
        // clear the form values
        $scope.getPrime = {};
    };

});

primes_n_e.controller('uplodeController',
    function ($scope, singleFactory, sysStateFactory){
    $scope.primes = [];

    // setup sysState 
    $scope.sysState = {};
    sysStateFactory.getSysState(function (data){
        $scope.sysState = data;
    });
    $scope.sysState.state = 'set';

    $scope.getSet = function (){
    };
});