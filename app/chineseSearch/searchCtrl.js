mainApp.controller('searchCtrl', function ($scope, $rootScope, $log, $state, $stateParams, searchService) {

    'use strict';
    $log.info('+ searchCtrl()');
    $scope.test="ANGULAR TEST";
    $scope.results;
    $scope.totalCount=0;
    var mainUrl = "http://localhost:9200/eng_chn_keyword/page/_search?explain" ;
    $scope.searchAll = function(){
      console.log("inside searchAll ===== "+$scope.searchText);
    //  var serviceURL = "data/chineseSearch.json";
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
      searchService.searchAll(mainUrl,q).success(successFn).error(errorFn);
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
      searchService.searchTitleOnly(mainUrl,q).success(successFn).error(errorFn);

    }

  $scope.searchBoolAll = function(){
    console.log("inside searchAll ===== "+$scope.searchText);
    var boolurl = "http://localhost:9200/hksearch/page/_search?size=30" ;
    //  var serviceURL = "data/chineseSearch.json";
    var q = JSON.stringify({"query":{"match_all":{}}});
    var errorFn = function(data){
      $scope.error = "No Data Found";
    }
    var successFn = function(data) {
      console.log("successFn data"+JSON.stringify(data));

      $scope.results = data;
      $scope.totalCount = data.hits.total;
      $state.go("boolSearch");
    }
    searchService.searchAll(boolurl,q).success(successFn).error(errorFn);
  }

    $scope.searchBoolean = function (){
      var boolurl = "http://localhost:9200/hksearch/page/_search?size=30" ;
      console.log("inside the searchBoolean");
      var q = JSON.stringify({
        "query": {
          "bool": {
            "must": [
              { "match": { "C_title": $scope.searchText } }
            ],
            "must_not": [
              { "match": { "C_title": $scope.ignoreText } }
            ]
          }
        }
      });
      var errorFn = function(data){
        $scope.error = "No Data Found";
      }
      var successFn = function(data) {
        console.log("successFn data"+JSON.stringify(data));

        $scope.results = data;
        $scope.totalCount = data.hits.total;
        $state.go("boolSearch");
      }
      searchService.searchTitleOnly(boolurl,q).success(successFn).error(errorFn);
    }

    $scope.searchTitleDescription =function(){
      console.log("inside searchTitleDescription");
      //TODO
    }

});
