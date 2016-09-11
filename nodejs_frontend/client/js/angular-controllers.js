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
    $scope.sysState.state = 'cust';

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


// // SETUP productsController
// primes_n_e.controller('productsController',  
//  function ($scope, productsFactory, sysStateFactory){ 
//  // productsController specific parameters
//  // setup paging parameter
//  var pageInfo = {}; 
//  pageInfo['limit']=10;
//  pageInfo['createdOnBefor'] = new Date();

//  // set sysState     
//  $scope.sysState = {}; 
//  sysStateFactory.getSysState(function (data){
//      $scope.sysState = data;
//  })
//  $scope.sysState.state = 'prod';

//  $scope.getProdPage = function ( pageInfo ) {
//      productPage =[];
//      productsFactory.getproductPage(pageInfo, function (data){
//          $scope.productPage = data;
//          pageInfo.createdOnBefor = 
//              $scope.productPage[$scope.productPage.length-1].createdOn;          
//      })
//  }
//  // lode first page of items
//  $scope.getProdPage( pageInfo);
        
//  $scope.nextProdPage = function (){  
//      $scope.getProdPage( pageInfo);      
//   }

//  $scope.addProduct = function (){        
//      // now use customerFactory.addCustomer to add Customer
//      productsFactory.addProduct($scope.newProduct, function (){          
//      // update products page
//      // reset to first page of items whair the new item will apier
//      pageInfo['createdOnBefor'] = new Date();    
//      // relode first page of items
//      $scope.getProdPage( pageInfo);
//      });         
//      // clear the form values        
//      $scope.newProduct = {};
//  }
// });


// primes_n_e.controller('dashboardController',     
//  function ($scope, $filter, productsFactory, customerFactory, 
//      orderFactory, sysStateFactory ){ 
//  // dashboardController specific parameters
//  // setup paging parameter
//  var pageInfoProduct ={},
//      pageInfoCustomer={},
//      pageInfoOrder={}
//  pageInfoProduct['limit']=5;
//  pageInfoProduct['createdOnBefor'] = new Date();
//  pageInfoCustomer['limit']=3;
//  pageInfoCustomer['createdOnBefor'] = new Date();
//  pageInfoOrder['limit']=4;
//  pageInfoOrder['createdOnBefor'] = new Date();

//  // set sysState     
//  $scope.sysState = {}; 
//  sysStateFactory.getSysState(function (data){
//      $scope.sysState = data;
//  })
//  $scope.sysState.state = 'dash';

//  // setup $scope.productPage 
//  $scope.getProdPage = function ( pageInfoProduct ) {
//      productPage =[];
//      productsFactory.getproductPage( pageInfoProduct, function (data){
//          $scope.productPage = data;          
//          pageInfoProduct.createdOnBefor = 
//              $scope.productPage[$scope.productPage.length-1].createdOn;          
//      })
//  }
//  // lode first page of items
//  $scope.getProdPage( pageInfoProduct );
    
//  $scope.nextProdPage = function (){  
//      $scope.getProdPage( pageInfoProduct );
//  }
    
//  // setup $scope.customerPage
//  $scope.getCustPage = function ( pageInfoCustomer ) {
//      customerPage =[];
//      customerFactory.getCustomerPage( pageInfoCustomer, function (data){
//          $scope.customerPage = data;
//          pageInfoCustomer.createdOnBefor = 
//              $scope.customerPage[$scope.customerPage.length-1].created_at;
//      });
//  }
//  // lode first page of items
//  $scope.getCustPage( pageInfoCustomer );
    
//  $scope.nextCustPage = function (){  
//      $scope.getCustPage( pageInfoCustomer );
//  }

// // setup $scope.orderPage
// $scope.getOrderPage = function ( pageInfoOrder ) {
//      orderPage =[];
//      orderFactory.getOrderPage( pageInfoOrder, function (data){
//          $scope.orderPage = data;
//          // kill console.log('$scope.orderPage',$scope.orderPage[0]);
//          pageInfoOrder.createdOnBefor = 
//              $scope.orderPage[$scope.orderPage.length-1].createOn;
//      });
//  }
//  // lode first page of items
//  $scope.getOrderPage( pageInfoOrder );
    
//  $scope.nextOrderPage = function (){ 
//      $scope.getOrderPage( pageInfoOrder );
//  }

//});


    