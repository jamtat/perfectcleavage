angular.module('rockGrid', [
    'rockServices',
    'ngAnimate'
]).

// Grid
controller('rockGridCtrl', function($scope, Rock) {
    $scope.rocks = {}
    Rock.query().$promise
    .then(function(value) {
        $scope.rocks = value
        console.log(value)
    })
    $scope.gridWidth = 4
}).

filter('int', function() {
    return function(input) {
        return input|0
    }
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
