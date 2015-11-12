mainApp.controller('searchCtrl', function ($scope, $rootScope, $log, $state, $stateParams, searchService, urlConstants) {

    'use strict';
    $log.info('+ searchCtrl()');
    $scope.test="ANGULAR TEST";
    $scope.results;
    $scope.cjkBiGram ;
    $scope.smartCNGram ;
    $scope.hanGram ;
    $scope.totalCount=0;
    var simpleSearchURL = urlConstants.SIMPLE_SEARCH_URL;
    var advanceSearchURL = urlConstants.ADV_SEARCH_URL ;

    $scope.basicSearchAll = function(){
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
      searchService.searchAll(simpleSearchURL,q).success(successFn).error(errorFn);
    }






    $scope.cjkAnalyzerBIGram = function() {
      if ($scope.searchText != null) {
        console.log("cjkAnalyzerBIGram");
       // var cjkAnalyseUrl = "http://localhost:9200/eng_chn_keyword/_analyze?analyzer=cjk";
        var errorFn = function(data) {
          $scope.error = "No Data Found";
        }
        var successFn = function(data) {
          console.log("successFn data" + JSON.stringify(data));

          $scope.cjkBiGram = data;
        }
        searchService.searchTitleOnly(urlConstants.ANALYSER_URL, $scope.searchText).success(successFn).error(errorFn);
      }

    }

    $scope.basicSearchTitleOnly = function() {
      console.log("inside searchTitleOnly");
      var q = JSON.stringify({"query": {"match_phrase": {"chinese_title": $scope.searchText}}});
      //var q = JSON.stringify({"query":{"match":{"english_title":$scope.searchText}}});
      var errorFn = function(data) {
        $scope.error = "No Data Found";
      }
      var successFn = function(data) {
        console.log("successFn data" + JSON.stringify(data));

        $scope.results = data;
        $scope.totalCount = data.hits.total;
        $state.go("search");
      }
      searchService.searchTitleOnly(simpleSearchURL, q).success(successFn).error(errorFn);

    }

    $scope.searchAll = function() {
      console.log("inside searchAll ===== " + $scope.searchText);
      //  var serviceURL = "data/chineseSearch.json";
      var q = JSON.stringify({"query": {"match_all": {}}});
      var errorFn = function(data) {
        $scope.error = "No Data Found";
      }
      var successFn = function(data) {
        console.log("successFn data" + data);
        console.log("successFn data" + JSON.stringify(data));
        $scope.results = data;
        $scope.totalCount = data.hits.total;
        $state.go("advSearch");
      }
      searchService.searchAll(advanceSearchURL, q).success(successFn).error(errorFn);
    }

    $scope.searchTitleAndDescriptionOnly = function() {
      console.log("inside searchTitleOnly Lang" + $scope.searchLang);
      var elasticQuery = ''
      if ($scope.searchLang == undefined) {
        elasticQuery = {"query": {"multi_match": {"query": $scope.searchText, "fields": ["C_description", "C_title"]}}};
      } else if ($scope.searchLang == 'Chinese') {
        elasticQuery = {"query": {"multi_match": {"query": $scope.searchText, "fields": ["C_description", "C_title"]}}};
      } else if ($scope.searchLang == 'English') {
        elasticQuery = {
          "query": {
            "multi_match": {
              "query": $scope.searchText,
              "fields": ["E_description", "sugg_title", "E_title"]
            }
          }
        };
      }
      console.log("inside searchTitleOnly Lang Query" + JSON.stringify(elasticQuery));
      var q = JSON.stringify(elasticQuery);
      var errorFn = function(data) {
        $scope.error = "No Data Found";
      }
      var successFn = function(data) {
        console.log("successFn data" + data);

        $scope.results = data;
        $scope.totalCount = data.hits.total;
        $state.go("advSearch");
      }
      searchService.searchTitleOnly(advanceSearchURL, q).success(successFn).error(errorFn);

    }

  $scope.analyzerForCJKAdvSearch = function() {
    var url = urlConstants.ADV_SEARCH_ANALYSER_CJK;
    if ($scope.searchText != null) {
      console.log("analyzerForCJKAdvSearch");
      var errorFn = function(data) {
        $scope.error = "No Data Found";
      }
      var successFn = function(data) {
        console.log("successFn data" + JSON.stringify(data));

        $scope.cjkBiGram = data;
      }
      searchService.searchTitleOnly(url, $scope.searchText).success(successFn).error(errorFn);
    }

  }
  $scope.analyzerForHanAdvSearch = function() {
    var url = urlConstants.ADV_SEARCH_ANALYSER_HAN;
    if ($scope.searchText != null) {
      console.log("analyzerForHanAdvSearch");
      var errorFn = function(data) {
        $scope.error = "No Data Found";
      }
      var successFn = function(data) {
        console.log("successFn data" + JSON.stringify(data));

        $scope.hanGram = data;
      }
      searchService.searchTitleOnly(url, $scope.searchText).success(successFn).error(errorFn);
    }

  }

    $scope.searchTitleOnly = function() {
      console.log("inside searchTitleOnly Lang" + $scope.searchLang);
      var elasticQuery = ''
      if ($scope.searchLang == undefined) {
        // elasticQuery = {"query":{"match_phrase":{"query":$scope.searchText,"fields":["C_title"]}}} ;
        elasticQuery = {"query": {"match": {"C_title": $scope.searchText}}};
      } else if ($scope.searchLang == 'Chinese') {
        // elasticQuery = {"query":{"match_phrase":{"query":$scope.searchText,"fields":["C_title"]}}} ;
        elasticQuery = {
          "query": {"match_phrase": {"C_title": $scope.searchText}},
          "highlight": {"fields": {"C_title": {}}}
        };
      } else if ($scope.searchLang == 'English') {
        // elasticQuery = {"query":{"match_phrase":{"query":$scope.searchText,"fields":["sugg_title"]}}} ;
        elasticQuery = {"query": {"match_phrase": {"sugg_title": $scope.searchText}}};
      }
      console.log("inside searchTitleOnly Lang Query" + JSON.stringify(elasticQuery));
      var q = JSON.stringify(elasticQuery);
      var errorFn = function(data) {
        $scope.error = "No Data Found";
      }
      var successFn = function(data) {
        console.log("successFn data" + JSON.stringify(data));

        $scope.results = data;
        $scope.totalCount = data.hits.total;
        $state.go("advSearch");
      }
      searchService.searchTitleOnly(advanceSearchURL, q).success(successFn).error(errorFn);

    }

    $scope.searchBoolAll = function() {
      console.log("inside searchAll ===== " + $scope.searchText);
      // var boolurl = "http://localhost:9200/hksearch/page/_search?size=30" ;
      //  var serviceURL = "data/chineseSearch.json";
      var q = JSON.stringify({"query": {"match_all": {}}});
      var errorFn = function(data) {
        $scope.error = "No Data Found";
      }
      var successFn = function(data) {
        console.log("successFn data" + JSON.stringify(data));

        $scope.results = data;
        $scope.totalCount = data.hits.total;
        $state.go("boolSearch");
      }
      searchService.searchAll(advanceSearchURL, q).success(successFn).error(errorFn);
    }

    $scope.searchBoolean = function() {
      //  var boolurl = "http://10.0.1.213:9200/hksearch/page/_search?size=30" ;
      console.log("inside the searchBoolean");
      var q = JSON.stringify({
        "query": {
          "bool": {
            "must": [
              {"match": {"C_title": $scope.searchText}}
            ],
            "must_not": [
              {"match": {"C_title": $scope.ignoreText}}
            ]
          }
        }
      });
      var errorFn = function(data) {
        $scope.error = "No Data Found";
      }
      var successFn = function(data) {
        console.log("successFn data" + JSON.stringify(data));

        $scope.results = data;
        $scope.totalCount = data.hits.total;
        $state.go("boolSearch");
      }
      searchService.searchTitleOnly(advanceSearchURL, q).success(successFn).error(errorFn);
    }

    $scope.searchTitleDescription = function() {
      console.log("inside searchTitleDescription");
      //TODO
    }





  $scope.basicSmartCNSearchAll = function(){
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
      $state.go("smarctcnBasicSearch");
    }
    searchService.searchAll(urlConstants.SMARTCN_SIMPLE_SEARCH_URL,q).success(successFn).error(errorFn);
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
      searchService.searchTitleOnly(urlConstants.SMARTCN_ANALYSER_URL, $scope.searchText).success(successFn).error(errorFn);
    }

  }

  $scope.aggSearch = function(){
    console.log("inside agg search");
    var q = JSON.stringify();
  }

  $scope.basicSmartCNSearchTitleOnly = function() {
    console.log("inside searchTitleOnly");
    var q = JSON.stringify({"query": {"match": {"chinese_title": $scope.searchText}}});
    //var q = JSON.stringify({"query":{"match":{"english_title":$scope.searchText}}});
    var errorFn = function(data) {
      $scope.error = "No Data Found";
    }
    var successFn = function(data) {
      console.log("successFn data" + JSON.stringify(data));

      $scope.results = data;
      $scope.totalCount = data.hits.total;
      $state.go("smarctcnBasicSearch");
    }
    searchService.searchTitleOnly(urlConstants.SMARTCN_SIMPLE_SEARCH_URL, q).success(successFn).error(errorFn);

  }


  });
