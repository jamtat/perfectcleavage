var app = angular.module('PerfectCleavage', [
    'ngTouch',
    'ngRoute',
    'rockServices'
])


app.config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true)

    $routeProvider.
    when('/', {
        templateUrl: '/views/home.html',
        controller: 'homeCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });
})

app.controller('homeCtrl', function($scope) {
    $scope.bacon = 'yes, this is dog'
})
