mainApp.controller('advsearchCtrl', function ($scope, $rootScope, $log, $state, $stateParams, advsearchService, urlConstants) {

    'use strict';
    $log.info('+ searchCtrl()');
    $scope.test="ANGULAR TEST";
    $scope.results;
    $scope.totalCount=0;
    $scope.showAll;
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

  $scope.searchEnglishTitleOnly =function(){
    console.log("inside searchTitleOnly Lang"+$scope.searchLang);
    $scope.showAll = false;
    var elasticQuery = ''
    elasticQuery = {
        "query":{
        "filtered":{
          "query":{
            "bool":{
              "should":[
                {
                  "match":{
                    "sugg_title":{
                      "query":$scope.searchText,
                      "minimum_should_match":"60<90%"
                    }
                  }
                }
              ]
            }
          }
        }
      }
    } ;


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
    advsearchService.searchTitleOnly(urlConstants.MIX_SIMPLE_SEARCH_URL,q).success(successFn).error(errorFn);

  }

  $scope.searchChineseTitleOnly =function(){
    console.log("inside searchTitleOnly Lang"+$scope.searchLang);
    $scope.showAll = false;
    var elasticQuery = ''
    elasticQuery = {"query":{
      "filtered":{
        "query":{
          "bool":{
            "should":[
              {
                "match":{
                  "chinese_title":{
                    "query":$scope.searchText,
                    "minimum_should_match":"60<90%"
                  }
                }
              }
            ]
          }
        }
      }
    }
    } ;



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
    advsearchService.searchTitleOnly(urlConstants.MIX_SIMPLE_SEARCH_URL,q).success(successFn).error(errorFn);

  }

  $scope.searchTitleOnly =function(){
    console.log("inside searchTitleOnly Lang"+$scope.searchLang);
    $scope.showAll = false;
    var elasticQuery = ''
    if($scope.searchLang ==  undefined){
     // elasticQuery = {"query":{"match_phrase":{"query":$scope.searchText,"fields":["C_title"]}}} ;
     // elasticQuery = {"query":{"match_phrase":{"chinese_title":$scope.searchText}}};
      elasticQuery = {"query":{
        "multi_match" : {
          "query" : $scope.searchText,
          "fields" : [ "mixed_english_title", "mixed_chinese_title" ],  "minimum_should_match":"60<90%"
        }
      }
      } ;
    }else if($scope.searchLang == 'Chinese'){
     elasticQuery = {"query":{
       "multi_match" : {
         "query" : $scope.searchText,
         "fields" : [ "mixed_english_title", "mixed_chinese_title" ],  "minimum_should_match":"60<90%"
       }
     }
     } ;
      //elasticQuery = {"query":{"match_phrase":{"chinese_title":$scope.searchText}}, "highlight": {"fields" : {"chinese_title" : {}}}};
    }else if($scope.searchLang == 'English'){
     // elasticQuery = {"query":{"match_phrase":{"query":$scope.searchText,"fields":["sugg_title"]}}} ;
      elasticQuery = {"query":{
        "multi_match" : {
          "query" : $scope.searchText,
          "fields" : [ "sugg_title" ],  "minimum_should_match":"60<90%"
        }
      }
      } ;
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
    advsearchService.searchTitleOnly(urlConstants.MIX_SIMPLE_SEARCH_URL,q).success(successFn).error(errorFn);

  }


  $scope.basicSmartCNSearchAll = function(){
    console.log("inside searchAll ===== "+$scope.searchText);
    $scope.showAll = true;
    //  var serviceURL = "data/chineseSearch.json";
    var q = JSON.stringify({"query":{"match_all":{}}});
    var errorFn = function(data){
      $scope.error = "No Data Found";
    }
    var successFn = function(data) {
      console.log("successFn data"+JSON.stringify(data));

      $scope.results = data;
      $scope.totalCount = data.hits.total;
      $state.go("mixChineseSearch");
    }
    advsearchService.searchAll(urlConstants.MIX_SIMPLE_SEARCH_URL,q).success(successFn).error(errorFn);
  }






  $scope.smartcnAnalyzerBIGram = function() {
    if ($scope.searchText != null) {
      console.log("smartcnAnalyzerBIGram");
      // var cjkAnalyseUrl = "http://localhost:9200/eng_chn_keyword/_analyze?analyzer=cjk";
      var errorFn = function(data) {
        $scope.error = "No Data Found";
      }
      var successFn = function(data) {
        console.log("successFn data" + JSON.stringify(data));

        $scope.smartCNGram = data;
      }
      advsearchService.searchTitleOnly(urlConstants.SMARTCN_ANALYSER_URL, $scope.searchText).success(successFn).error(errorFn);
    }

  }

  $scope.aggSearch = function(){
    console.log("inside agg search");
    var q = JSON.stringify();
  }

  $scope.basicSmartCNSearchTitleOnly = function() {
    console.log("inside searchTitleOnly");
    var q = JSON.stringify({"query":{
      "multi_match" : {
        "query" : $scope.searchText,
        "fields" : [ "chinese_title", "sugg_title" ]
      }
    }
    });
    //var q = JSON.stringify({"query":{"match":{"english_title":$scope.searchText}}});
    var errorFn = function(data) {
      $scope.error = "No Data Found";
    }
    var successFn = function(data) {
      console.log("successFn data" + JSON.stringify(data));

      $scope.results = data;
      $scope.totalCount = data.hits.total;
      $state.go("mixChineseSearch");
    }
    advsearchService.searchTitleOnly(urlConstants.MIX_SIMPLE_SEARCH_URL, q).success(successFn).error(errorFn);

  }

    $scope.searchTitleDescription =function(){
      console.log("inside searchTitleDescription");
      //TODO
    }

});
