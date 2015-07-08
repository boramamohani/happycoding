var countryJsonUrl = 'https://s3-ap-northeast-1.amazonaws.com/mrt-testdata/jsons/country.json';
var offersUrl = 'https://s3-ap-northeast-1.amazonaws.com/mrt-testdata/jsons/offers.json';
var guidesUrl = 'https://s3-ap-northeast-1.amazonaws.com/mrt-testdata/jsons/guides.json';
var currenciesUrl = 'https://s3-ap-northeast-1.amazonaws.com/mrt-testdata/jsons/currencies.json';


app.controller('MainController', ['$scope', '$http', function($scope, $http) {
	
	(function getTours() {
		$scope.tours = {} ; 

		$http({method: 'GET', url: offersUrl})
			.success(function(data, status) {
				console.log(status) ; 

				$scope.tours.status = status ; 
				$scope.tours.data = data ;

				// alert($scope.offers.data[2].title) ; 

				$http({method: 'GET', url: guidesUrl})
					.success(function(guidesData, guidesStatus) {
						$scope.tours.status = guidesStatus ; 
						var guides = guidesData ; 

						_.each($scope.tours.data, function searchOurGuide(element, index, list) {
							console.log(element.guide_id) ; 
							console.log(guides) ; 
							var ourGuide = _.find(guides, function(guide) {
								return guide.id ===	element.guide_id ; 
							}) ;
							$scope.tours.data[index].username = ourGuide.user.username ; 
							$scope.tours.data[index].profile_medium_url = ourGuide.user.profile_medium_url ;  
						});
					})
					.error(function(data, status) {
						console.error("ERROR: failed at getting Guides data") ;
					}) ; 
			})
			.error(function(data, status) {
				$scope.offers.status = status ; 
				$scope.offers.data = data || "request failed" ; 

				console.error("ERROR: failed at getting Tours data") ; 
			}) ; 	
	}) () ; 

}]) ; 