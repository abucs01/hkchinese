mainApp.controller('homeCtrl', function ($scope, $rootScope, $log, $state, $stateParams, homeService) {

  'use strict';
  $log.info('+ searchCtrl()');
  $scope.test="ANGULAR TEST";
  $scope.results;
  $scope.totalCount=0;
  var mainUrl = "http://localhost:9200/eng_chn_keyword/page/_search?explain" ;
  $scope.searchAll = function(){
    console.log("inside searchAll ===== "+$scope.searchText);
    //  var serviceURL = "data/search.json";
    var q = JSON.stringify({"query":{"match_all":{}}});
    var errorFn = function(data){
      $scope.error = "No Data Found";
    }
    var successFn = function(data) {
      console.log("successFn data"+JSON.stringify(data));

      $scope.results = data;
      $scope.totalCount = data.hits.total;
      $state.go("search");
    }
    homeService.searchAll(mainUrl,q).success(successFn).error(errorFn);
  }

  $scope.searchTitleOnly =function(){
    console.log("inside searchTitleOnly");
    var q = JSON.stringify({"query":{"match_phrase":{"chinese_title":$scope.searchText}}});
    //var q = JSON.stringify({"query":{"match":{"english_title":$scope.searchText}}});
    var errorFn = function(data){
      $scope.error = "No Data Found";
    }
    var successFn = function(data) {
      console.log("successFn data"+JSON.stringify(data));

      $scope.results = data;
      $scope.totalCount = data.hits.total;
      $state.go("search");
    }
    homeService.searchTitleOnly(mainUrl,q).success(successFn).error(errorFn);

  }

  $scope.searchTitleDescription =function(){
    console.log("inside searchTitleDescription");
    //TODO
  }

});
