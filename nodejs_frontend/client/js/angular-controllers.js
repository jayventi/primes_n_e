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
    function ($scope, Upload, singleFactory, sysStateFactory){
    $scope.primes = [];

    // setup sysState 
    $scope.sysState = {};
    sysStateFactory.getSysState(function (data){
        $scope.sysState = data;
    });
    $scope.sysState.state = 'set';

    $scope.getSetUplode = function (){
        Upload.upload({
                url: 'http://localhost:8078/upload', //webAPI exposed to upload the file
                data:{file:$scope.up.file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise                
                if(resp.data.error_code === 0){ //validate success
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                for (var i = 0; i < resp.data.data.length; i++) {
                    $scope.primes.push(resp.data.data[i]);
                }
                } else {
                    onsole.log('an error occured');
                }
            });


        // clear the form values
        //$scope.up.file = {};
    };
});