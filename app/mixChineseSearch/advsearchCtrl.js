mainApp.controller('advsearchCtrl', function ($scope, $rootScope, $log, $state, $stateParams, advsearchService, urlConstants) {

    'use strict';
    $log.info('+ searchCtrl()');
    $scope.test="ANGULAR TEST";
    $scope.results;
    $scope.totalCount=0;
    var mainUrl = urlConstants.MIX_SIMPLE_SEARCH_URL;
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
        elasticQuery = {"query":{"multi_match":{"query":$scope.searchText,"fields":["chinese_title"]}}} ;
      }else if($scope.searchLang == 'Chinese'){
        elasticQuery = {"query":{"multi_match":{"query":$scope.searchText,"fields":["chinese_title"]}}} ;
      }else if($scope.searchLang == 'English'){
        elasticQuery = {"query":{"multi_match":{"query":$scope.searchText,"fields":["english_title"]}}} ;
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
     // elasticQuery = {"query":{"match_phrase":{"chinese_title":$scope.searchText}}};
      elasticQuery = {"query":{
        "multi_match" : {
          "query" : $scope.searchText,
          "fields" : [ "chinese_title^3", "english_title^2" ]
        }
      }
      } ;
    }else if($scope.searchLang == 'Chinese'){
     elasticQuery = {"query":{
       "multi_match" : {
         "query" : $scope.searchText,
         "fields" : [ "chinese_title^3", "english_title" ]
       }
     }
     } ;
      //elasticQuery = {"query":{"match_phrase":{"chinese_title":$scope.searchText}}, "highlight": {"fields" : {"chinese_title" : {}}}};
    }else if($scope.searchLang == 'English'){
     // elasticQuery = {"query":{"match_phrase":{"query":$scope.searchText,"fields":["sugg_title"]}}} ;
      elasticQuery = {"query":{"match_phrase":{"english_title":$scope.searchText}}};
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
