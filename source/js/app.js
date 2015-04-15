var PerfectClevage = angular.module('PerfectCleavage', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'cordovaService',
    'rockView',
    'rockGrid'
])


PerfectClevage.config(function($routeProvider) {
    //$locationProvider.html5Mode(true)

    $routeProvider.
    when('/', {
        templateUrl: '/views/rock-home.html',
        controller: 'homeCtrl'
    }).
    when('/rock/:rockId', {
        templateUrl: '/views/rock-view.html',
        controller: 'rockViewCtrl'
    }).
    otherwise({
        redirectTo: '/'
    })
})

PerfectClevage.controller('homeCtrl', function($scope) {
    $scope.pageClass = 'home'
})

PerfectClevage.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});
