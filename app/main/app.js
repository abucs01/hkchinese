
var mainApp = angular.module("mainApp",[
	'ngResource',
  'ui.router'
]);

mainApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider ) {
    'use strict';

  //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $stateProvider
        .state('search', {
            url: '/chineseSearch',
            templateUrl: 'app/chineseSearch/chineseSearch.tpl.html',
            controller: 'searchCtrl'
        })
      .state('chineseSuggestFunctionScoreSearch', {
        url: '/chineseSuggestFunctionScoreSearch',
        templateUrl: 'app/chineseSearch/chineseSuggestFunctionScoreSearch.tpl.html',
        controller: 'searchCtrl'
      })
      .state('smarctcnBasicSearch', {
        url: '/smarctcnBasicSearch',
        templateUrl: 'app/chineseSearch/smarctcnBasicSearch.tpl.html',
        controller: 'searchCtrl'
      })
      .state('boolSearch', {
          url: '/boolSearch',
          templateUrl: 'app/chineseSearch/boolSearch.tpl.html',
          controller: 'searchCtrl'
      })
      .state('advSearch', {
          url: '/advSearch',
          templateUrl: 'app/chineseSearch/advSearch.tpl.html',
          controller: 'searchCtrl'
      })
				.state('mixChineseSearch', {
            url: '/mixChineseSearch',
            templateUrl: 'app/mixChineseSearch/mixChineseSearch.tpl.html',
            controller: 'advsearchCtrl'
        })
      .state('home', {
          url: '/home',
          templateUrl: 'app/home/home.tpl.html',
          controller: 'homeCtrl'
      })
      .state('mapping', {
        url: '/mapping',
        templateUrl: 'app/home/mappingInfo.tpl.html',
        controller: 'homeCtrl'
      })
	      ;

        //Re-directs
        $urlRouterProvider.otherwise('/home');

});


mainApp.run(function ($log, $rootScope, $state, $urlRouter,$location) { // Inject Service to load data
    $log.debug("mainApp.run");
    $state.transitionTo('search');
});
