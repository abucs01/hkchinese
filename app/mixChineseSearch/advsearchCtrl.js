mainApp.controller('advsearchCtrl', function ($scope, $rootScope, $log, $state, $stateParams, advsearchService, urlConstants) {

    'use strict';
    $log.info('+ searchCtrl()');
    $scope.test="ANGULAR TEST";
    $scope.results;
    $scope.totalCount=0;
    var mainUrl = urlConstants.ADV_MAIN_URL;
    $scope.searchAll = function(){
      console.log("inside searchAll ===== "+$scope.searchText);
    //  var serviceURL = "data/chineseSearch.json";
      var q = JSON.stringify({"query":{"match_all":{}}});
      var errorFn = function(data){
			$scope.error = "No Data Found";
  		}
  		var successFn = function(data) {
        console.log("successFn data"+data);
        console.log("successFn data"+JSON.stringify(data));
        $scope.results = data;
        $scope.totalCount = data.hits.total;
        $state.go("mixChineseSearch");
  		}
      advsearchService.searchAll(mainUrl,q).success(successFn).error(errorFn);
    }

    $scope.searchTitleAndDescriptionOnly =function(){
      console.log("inside searchTitleOnly Lang"+$scope.searchLang);
      var elasticQuery = ''
      if($scope.searchLang ==  undefined){
        elasticQuery = {"query":{"multi_match":{"query":$scope.searchText,"fields":["C_description","C_title"]}}} ;
      }else if($scope.searchLang == 'Chinese'){
        elasticQuery = {"query":{"multi_match":{"query":$scope.searchText,"fields":["C_description","C_title"]}}} ;
      }else if($scope.searchLang == 'English'){
        elasticQuery = {"query":{"multi_match":{"query":$scope.searchText,"fields":["E_description","sugg_title","E_title"]}}} ;
      }
      console.log("inside searchTitleOnly Lang Query"+JSON.stringify(elasticQuery));
      var q = JSON.stringify(elasticQuery);
      var errorFn = function(data){
      $scope.error = "No Data Found";
      }
      var successFn = function(data) {
        console.log("successFn data"+data);

        $scope.results = data;
        $scope.totalCount = data.hits.total;
        $state.go("mixChineseSearch");
      }
      advsearchService.searchTitleOnly(mainUrl,q).success(successFn).error(errorFn);

    }


  $scope.searchTitleOnly =function(){
    console.log("inside searchTitleOnly Lang"+$scope.searchLang);
    var elasticQuery = ''
    if($scope.searchLang ==  undefined){
     // elasticQuery = {"query":{"match_phrase":{"query":$scope.searchText,"fields":["C_title"]}}} ;
      elasticQuery = {"query":{"match_phrase":{"C_title":$scope.searchText}}};
    }else if($scope.searchLang == 'Chinese'){
     // elasticQuery = {"query":{"match_phrase":{"query":$scope.searchText,"fields":["C_title"]}}} ;
      elasticQuery = {"query":{"match_phrase":{"C_title":$scope.searchText}}, "highlight": {"fields" : {"C_title" : {}}}};
    }else if($scope.searchLang == 'English'){
     // elasticQuery = {"query":{"match_phrase":{"query":$scope.searchText,"fields":["sugg_title"]}}} ;
      elasticQuery = {"query":{"match_phrase":{"sugg_title":$scope.searchText}}};
    }
    console.log("inside searchTitleOnly Lang Query"+JSON.stringify(elasticQuery));
    var q = JSON.stringify(elasticQuery);
    var errorFn = function(data){
      $scope.error = "No Data Found";
    }
    var successFn = function(data) {
      console.log("successFn data"+JSON.stringify(data));

      $scope.results = data;
      $scope.totalCount = data.hits.total;
      $state.go("mixChineseSearch");
    }
    advsearchService.searchTitleOnly(mainUrl,q).success(successFn).error(errorFn);

  }

    $scope.searchTitleDescription =function(){
      console.log("inside searchTitleDescription");
      //TODO
    }

});
