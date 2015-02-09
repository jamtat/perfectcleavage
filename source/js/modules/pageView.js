angular.module('pageView', [
	'ngTouch',
	'ngAnimate'
]).

// Grid
controller('pageViewCtrl', function($scope) {

}).

directive('pageView', function() {
	return {
		restrict: 'E',
		controller: 'pageViewCtrl',
		templateUrl: '/views/page-view.html'
	}
})
