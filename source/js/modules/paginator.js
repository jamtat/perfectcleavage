angular.module('paginator', [
    'ngTouch',
    'ngAnimate'
]).

// Paginator
controller('paginatorCtrl', function($scope, $element) {
    $scope.fuck = 'bitches'
    console.log('YEAAAAAAAH')
}).

directive('paginator', function() {
    return {
        restrict: 'E',
        controller: 'paginatorCtrl',
        templateUrl: '/views/paginator.html'
    }
})
