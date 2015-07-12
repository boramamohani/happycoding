var countryJsonUrl = 'https://s3-ap-northeast-1.amazonaws.com/mrt-testdata/jsons/country.json';
var offersUrl = 'https://s3-ap-northeast-1.amazonaws.com/mrt-testdata/jsons/offers.json';
var guidesUrl = 'https://s3-ap-northeast-1.amazonaws.com/mrt-testdata/jsons/guides.json';
var currenciesUrl = 'https://s3-ap-northeast-1.amazonaws.com/mrt-testdata/jsons/currencies.json';
/*
	offers.json 의 "main_price_amount" --> 이미 currencies.json "rate" 적용된 가격 표시?.  
*/

var LEFT_SIDE_CURRENCIES = ["KRW", "USD", "EUR", "JPY", "TWD", "THB", "NZD", "MYR", "HKD", "GBP", "CNY", "CAD", "AUD" ] ; 
var RIGHT_SIDE_CURRENCIES = ["CHF", "RUB", "DKK"] ; 
var currenciesJSON = "not_loaded" ; 


app.filter('formatPrice', function() {	//filter to format currencies
		return function(input) {
			var price = input.main_price_amount.toLocaleString()  ;  
			
			var foundRight = _.find(RIGHT_SIDE_CURRENCIES, function(currency) {
				return currency === input.main_price_currency_code ; 
			}) ; 
			if (typeof foundRight === 'undefined') {
				price = currenciesJSON[input.main_price_currency_code].symbol + ' ' + price ;
			} else {
				price += " " + currenciesJSON[input.main_price_currency_code].symbol ; 
			}

			return price ; 
		}
	})
	.filter('formatPrivateTour', function() {
		return function(input) {
			if (input) return "개별 여행" ; 
			else return "그룹 여행" ; 
		} 
	})
	.filter('formatTourDuration', function() {
		return function(input) {
			var unit = input.duration_unit ; 
			var duration = input.duration_size ; 
			
			if (unit === 'flexible')  return '조정가능' ;  
			else if (unit === 'day') return duration + '일' ; 	// TODO: check 'day' value if correct to schema
			else if (unit === 'hour') return duration + '시간' ; 
			else return '' ; 
		}
	})
	.filter('formatTourType', function(){
		return function(input) {
			if (input === 'walking') return '워킹투어' ; 
			else if (input === 'private_car') return '차량투어'; 
			else if (input === 'bicycle') return '자전거투어' ;  // TODO: check 'bicycle' value if correct in schema
			else return '' ; 
		}
	})
	.filter('formatReviews', function() {
		return function(input) {
			if (input === 0 || typeof input === 'undefined') return '리뷰 이벤트'
 			else return input + '개의 리뷰'
		}
	})
	.controller('MainController', ['$scope', '$http', function($scope, $http) {
		(function getTours() {
			$scope.tours = {} ; 

			if (currenciesJSON === "not_loaded") { 
				$http({method: 'GET', url: currenciesUrl})
					.success(function(data, status) {
						currenciesJSON = data ; 
						console.log("STATUS " + status + ": succeeded in getting today's currencies") ; 
					})
					.error(function(data, status) {
						console.error("STATUS " + status + ", ERROR: failed at getting Tours data") ; 
					}) ;  
			}

			$http({method: 'GET', url: offersUrl})
				.success(function(data, status) {
					console.log("STATUS " + status) ; 

					$scope.tours.status = status ; 
					$scope.tours.data = data ;

					// alert($scope.offers.data[2].title) ; 

					$http({method: 'GET', url: guidesUrl})
						.success(function(guidesData, guidesStatus) {
							$scope.tours.status = guidesStatus ; 
							var guides = guidesData ; 

							_.each($scope.tours.data, function searchOurGuide(element, index, list) {
								// console.log(element.guide_id) ; 
								// console.log(guides) ; 
								var ourGuide = _.find(guides, function(guide) {
									return guide.id ===	element.guide_id ; 
								}) ;
								$scope.tours.data[index].username = ourGuide.user.username ; 
								$scope.tours.data[index].profile_medium_url = ourGuide.user.profile_medium_url ;  
							});

							$http({method: 'GET', url: countryJsonUrl})
								.success(function(countryData, countryStatus) {
								
								})
								.error(function(data, status) {

								}) ; 
						})
						.error(function(data, status) {
							//insert more code heres
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