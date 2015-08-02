angular.module('mainController', [])
	.controller('mainCtrl', ['$scope', 'processTourData', function($scope, processTourData) {		
		
		processTourData(function(tours) {
			$scope.tours = tours ; 
		}) ; 

		$scope.itemsPerPage = 12 ; 
		$scope.currentPage = 1 ; 

		$scope.scoreToStar = function(tour) {
			if (tour.score > 4.0) return 'fiveStar' ; 
			else if (tour.score <= 4.0 && tour.score >3.0) return 'fourStar' ;
			else if (tour.score <= 3.0 && tour.score > 2.0) return 'threeStar' ; 
			else if (tour.score <= 2.0 && tour.score > 1.0) return 'twoStar' ; 
			else if (tour.score <= 1.0 && tour.score > 0) return 'oneStar' ; 
			else if (tour.score === 0) return 'zeroStar' ;
			else return "" ; 
		} ; 

		$scope.pageRange = function() {
			var rangeSize = 5 ; 
			var leftOffset = Math.floor(rangeSize/2); 
			var rightOffset = $scope.totalPages() - leftOffset ;  // TODO cannot read undefined
			//alert($scope.totalPages() ) ; 

			var ret = [] ; 
			var start = $scope.currentPage ; 

			if (start <= leftOffset) {
				start = 1 ;
			} else if (start >= rightOffset) {
				start = $scope.totalPages() - rangeSize + 1 ; 
			} else {
				start = start - leftOffset
			}			
			var end = ((start + rangeSize) > $scope.totalPages()) ? $scope.totalPages() : start + rangeSize -1;  
			for (var i = start ; i <= end  ; i++) { ret.push(i) ; } 
			return ret ; 
		} ;	

		$scope.totalPages = function() {
			return Math.ceil($scope.tours.length / $scope.itemsPerPage) ; // TODO cannot read length of undefined (from pageRange)
		} ;

		$scope.setPage = function(n) {
			$scope.currentPage = n ; 
		} ;

		$scope.prevPage = function() {
			if ($scope.currentPage > 1) {$scope.currentPage--} ;
		} ; 

		$scope.prevPageDisabled = function() {
			return $scope.currentPage === 1 ? "disabled" : "" ;
		} ;

		$scope.nextPage = function() {
			if ($scope.currentPage < $scope.totalPages()) {$scope.currentPage++ };
		} ;

		$scope.nextPageDisabled = function(){
			return $scope.currentPage === $scope.totalPages() ? "disabled" : "" ; 
		} ;


		$scope.typeFilter = {
			individual: true, 
			group: true
		} ; 

		$scope.durationFilter = {
			halfDay: true,
			day: true,
			dayPlus: true,
			flexible: true
		} ; 

		$scope.transportationFilter = {
			walk: true,
			auto: true,
			bike: true
		} ;

		$scope.filterList = function(tour) {
			if (($scope.typeFilter.individual === false) && (tour.private_tour === true)) return false; 
			if (($scope.typeFilter.group === false) && (tour.private_tour === false)) return false ; 
			if (($scope.durationFilter.flexible === false) && (tour.duration_unit === 'flexible')) return false
			if (($scope.durationFilter.dayPlus === false) && (tour.duration_unit === 'day')) return false ; 
			if (($scope.durationFilter.day === false) && (tour.duration_unit === 'hour') && (tour.duration_size > 6)) return false ; 
			if (($scope.durationFilter.halfDay === false) && (tour.duration_unit === 'hour') && (tour.duration_size <= 6)) return false ; 
			if (($scope.transportationFilter.walk === false) && (tour.tour_type === 'walking')) return false ; 
			if (($scope.transportationFilter.auto === false) && (tour.tour_type === 'private_car')) return false ; 
			if (($scope.transportationFilter.bike === false) && (tour.tour_type === 'bicycle')) return false ; 
			
			return true;
		} ; 
	}])  
	.filter('offset', function() {
		return function(input, start) {
			start = parseInt(start, 10);
			return input.slice(start) ; // TODO cannot read slice of undefined
		}
	})
	.filter('formatTourType', function() {
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
	.filter('formatTourTransportation', function(){
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
	}) ;