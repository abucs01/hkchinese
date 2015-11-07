mainApp.factory('searchService', ['$http', function ($http) {
	'use strict';
	return {
		 searchAll:  function (url,data) {
			  return $http.post(url,data,{
				  headers: {
					   'Content-Type': 'application/json'
					 }
			  });
		 },
		 searchTitleOnly:  function (url,data) {
			  return $http.post(url,data,{
				  headers: {
					   'Content-Type': 'application/json'
					 }
			  });
		 },
		 searchTitleDescription: function (url,data) {
			  return $http.post(url,data,{
				  headers: {
					   'Content-Type': 'application/json'
					 }
			  });
		 }
	};
}]);
