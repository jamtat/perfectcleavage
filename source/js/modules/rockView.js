angular.module('rockView', [
    'ngTouch',
    'ngRoute',
    'rockServices',
    'ngSanitize',
    'paginator',
    'ngFitText'
]).

controller('rockViewCtrl', function($scope, $routeParams, Rock) {
    var rockId = $routeParams.rockId
    $scope.pageClass = 'rockView'
    $scope.rock = {}
    Rock.get({rockId: rockId}).$promise
    .then(function(value) {
        $scope.rock = value
        console.log(value)
    })
}).

directive('imgload', function() {
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
            $element.bind('load', function() {
                //alert('image is loaded')
                var el = $element[0]
                el.className = ''
                el.parentNode.style.height = el.height+'px'
            })
        }
    };
}).

filter('formula', function() {
    return function(input) {
        return !!input ? input.replace(/_([0-9]+)/g, "<sub>$1</sub>") : ''
    }
}).


directive('rockA', function() {
    return {
        restrict: 'E',
        controller: 'rockACtrl',
        templateUrl: '/views/rockA.html'
    }
}).controller('rockACtrl', function($scope, $element) {

}).
directive('rockB', function() {
    return {
        restrict: 'E',
        controller: 'rockBCtrl',
        templateUrl: '/views/rockB.html'
    }
}).controller('rockBCtrl', function($scope, $element) {

}).
directive('rockC', function() {
    return {
        restrict: 'E',
        controller: 'rockCCtrl',
        templateUrl: '/views/rockC.html'
    }
}).controller('rockCCtrl', function($scope, $element) {

}).
directive('rockD', function() {
    return {
        restrict: 'E',
        controller: 'rockDCtrl',
        templateUrl: '/views/rockD.html'
    }
}).controller('rockDCtrl', function($scope, $element) {

})
