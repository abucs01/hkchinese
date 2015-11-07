mainApp.controller('homeCtrl', function ($scope, $rootScope, $log, $state, $stateParams, homeService) {

  'use strict';
  $log.info('+ searchCtrl()');
  $scope.test="ANGULAR TEST";
  $scope.results;
  $scope.heath;
  var mainUrl = "http://localhost:9200/_cat/indices/*?pretty" ;
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
   var healthUrl = "http://localhost:9200/_cat/health?v";
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




});
