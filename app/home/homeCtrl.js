mainApp.controller('homeCtrl', function ($scope, $rootScope, $log, $state, $stateParams, homeService,urlConstants) {

  'use strict';
  $log.info('+ searchCtrl()');
  $scope.test="ANGULAR TEST";
  $scope.results;
  $scope.health;
  $scope.mapping;

  var mainUrl = urlConstants.MAIN_URL ;
  $scope.indexDetails = function(){
    console.log("inside indexDetails ===== "+$scope.searchText);
   // var q = JSON.stringify({"query":{"match_all":{}}});
    var errorFn = function(data){
      $scope.error = "No Data Found";
    }
    var successFn = function(data) {
      console.log("successFn data"+JSON.stringify(data));

      $scope.results = data;
      $state.go("home");
    }
    homeService.searchforElasticGetCall(mainUrl).success(successFn).error(errorFn);
  }

  $scope.healthDetails = function(){
   var healthUrl = urlConstants.HEALTH_URL;
    var errorFn = function(data){
      $scope.error = "No Data Found";
    }
    var successFn = function(data) {
      console.log("successFn data"+JSON.stringify(data));

      $scope.health = data;
      $state.go("home");
    }
    homeService.searchforElasticGetCall(mainUrl).success(successFn).error(errorFn);
  }


  $scope.mappingDetails = function(){
    if($scope.searchMappingType == 'cjk-simple' ){
      var healthUrl = urlConstants.MAPPING_SIMPLE_URL;
    }else if ($scope.searchMappingType == 'cjk-adv'){
      var healthUrl = urlConstants.MAPPING_ADV_URL;
    }

    var errorFn = function(data){
      $scope.error = "No Data Found";
    }
    var successFn = function(data) {
      console.log("successFn data"+JSON.stringify(data));

      $scope.mapping = data;
      $state.go("mapping");
    }
    homeService.searchforElasticGetCall(healthUrl).success(successFn).error(errorFn);
  }

});
