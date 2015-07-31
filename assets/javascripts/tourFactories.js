var countryJsonUrl = 'https://s3-ap-northeast-1.amazonaws.com/mrt-testdata/jsons/country.json';
var offersUrl = 'https://s3-ap-northeast-1.amazonaws.com/mrt-testdata/jsons/offers.json';
var guidesUrl = 'https://s3-ap-northeast-1.amazonaws.com/mrt-testdata/jsons/guides.json';
var currenciesUrl = 'https://s3-ap-northeast-1.amazonaws.com/mrt-testdata/jsons/currencies.json';

/*
	offers.json 의 "main_price_amount" --> 이미 currencies.json "rate" 적용된 가격 표시?.  
*/

var LEFT_SIDE_CURRENCIES = ["KRW", "USD", "EUR", "JPY", "TWD", "THB", "NZD", "MYR", "HKD", "GBP", "CNY", "CAD", "AUD" ] ; 
var RIGHT_SIDE_CURRENCIES = ["CHF", "RUB", "DKK"] ; 

angular.module('tourFactories', [])
	.factory('fetchData', ['$http', function($http) {
		return {
			offers: $http({method: 'GET', url: offersUrl, cache: true}),
			currencies: $http({method: 'GET', url: currenciesUrl, cache: true}), 
			countries: $http({method: 'GET', url: countryJsonUrl, cache: true}),
			guides: $http({method: 'GET', url: guidesUrl, cache: true})
		} ; 
	}])
	.factory('processTourData', ['$q', 'fetchData', function($q, fetchData) {
		var promises = {
			offers : fetchData.offers,
			guides: fetchData.guides,
			countries: fetchData.countries, 
			currencies: fetchData.currencies
		} ; 
		
		return function(callback) {
			$q.all(promises).then(function(res) {
				var cities = res.countries.data.city_infos ; 
				var cities_min = {} ; 
				var tours = res.offers.data ; 
				var guides = res.guides.data ;
				var currency = res.currencies.data ;

				_.each(cities, function iterateCities(element, index, list) {
					cities_min[element.id] = element.locale_names.ko ; 
				});

				_.each(tours, function searchOurGuide(element, index, list) {
					var ourGuide = _.find(guides, function(guide) {
						return guide.id ===	element.guide_id ; 
					}) ;
					tours[index].username = ourGuide.user.username ; 
					tours[index].profile_medium_url = ourGuide.user.profile_medium_url ;  
					tours[index].cityName = cities_min[element.city_info_id] ; 

					// format price
					var price = tours[index].main_price_amount.toLocaleString()  ;  
					var foundRight = _.find(RIGHT_SIDE_CURRENCIES, function(currency) {
						return currency === tours[index].main_price_currency_code ; 
					}) ;
					
					if (typeof foundRight === 'undefined') {
						price = currency[tours[index].main_price_currency_code].symbol + ' ' + price ;
					} else {
						price += " " + currency[tours[index].main_price_currency_code].symbol ; 
					}
					tours[index].price = price ; 
				});	
				callback(tours) ; 
			}) ; 		
		}
	}]) ;
	