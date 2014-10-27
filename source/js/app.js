var app = angular.module('PerfectCleavage', [
    'ngTouch',
    'ngRoute',
    'rockView'
])


app.config(function($locationProvider, $routeProvider) {
    //$locationProvider.html5Mode(true)

    $routeProvider.
    when('/', {
        templateUrl: '/views/home.html',
        controller: 'homeCtrl'
    }).
    when('/rock/:rockId', {
        templateUrl: '/views/rock.html',
        controller: 'rockViewCtrl'
    }).
    otherwise({
        redirectTo: '/'
    })
})

app.controller('homeCtrl', function($scope) {
    $scope.bacon = 'yes, this is dog'
})
