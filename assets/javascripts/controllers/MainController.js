var countryJsonUrl = 'https://s3-ap-northeast-1.amazonaws.com/mrt-testdata/jsons/country.json';
var offersUrl = 'https://s3-ap-northeast-1.amazonaws.com/mrt-testdata/jsons/offers.json';
var guidesUrl = 'https://s3-ap-northeast-1.amazonaws.com/mrt-testdata/jsons/guides.json';
var currenciesUrl = 'https://s3-ap-northeast-1.amazonaws.com/mrt-testdata/jsons/currencies.json';


app.controller('MainController', ['$scope', '$http', function($scope, $http) {
	
	(function getOffers() {
		$scope.offers = {} ; 

		$http({method: 'GET', url: offersUrl})
		.success(function(data, status) {
			$scope.offers.status = status ; 
			$scope.offers.data = data ;

			alert($scope.offers.data[2].title) ; 
		})
		.error(function(data, status) {
			$scope.offers.status = status ; 
			$scope.offers.data = data || "request failed" ; 

			console.error("ERROR: failed at getting Offers data") ; 
		}) ; 	
	}) () ; 

	(function getGuides() {
		$scope.guides = {} ; 

		$http({method: 'GET', url: guidesUrl})
		.success(function(data, status) {
			$scope.guides.status = status ; 
			$scope.guides.data = data ;

			alert($scope.guides.data[4].user.username) ; 
		})
		.error(function(data, status) {
			$scope.guides.status = status ; 
			$scope.guides.data = data || "request failed" ; 

			console.error("ERROR: failed at getting Guides data") ; 
		}) ; 	
	}) () ; 

	


}]) ; 