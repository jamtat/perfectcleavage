angular.module('rockView', [
    'ngRoute',
    'rockServices'
]).

controller('rockViewCtrl', function($scope, $routeParams, Rock) {
    var rockId = $routeParams.rockId
    $scope.rock = Rock.get({rockId: rockId}, function(rock) {
        console.log(rock)
    })
})
