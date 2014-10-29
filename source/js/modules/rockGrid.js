angular.module('rockGrid', [
    'rockServices'
]).

// Grid
controller('rockGridCtrl', function($scope, Rock) {
    $scope.rocks = Rock.query()
}).

directive('rockGrid', function() {
    return {
        restrict: 'E',
        controller: 'rockGridCtrl',
        templateUrl: '/views/rock-grid.html'
    }
}).

// Grid Item
controller('rockGridItemCtrl', function() {

}).

directive('rockGridItem', function() {
    return {
        restrict: 'E',
        controller: 'rockGridItemCtrl',
        templateUrl: '/views/rock-grid-item.html'
    }
})
