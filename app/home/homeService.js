mainApp.factory('homeService', ['$http', function ($http) {
  'use strict';
  return {
    searchforElasticGetCall:  function (url) {
      return $http.get(url);
    }
  };
}]);
