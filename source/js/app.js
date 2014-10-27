var app = angular.module('PerfectCleavage', [
    'ngTouch',
    'ngRoute',
    'rockServices'
])


app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
    })
})

app.controller('homeCtrl', function($scope) {
    $scope.bacon = 'yes, this is dog'
})
