angular.module('rockView', [
    'ngRoute',
    'rockServices',
    'ngSanitize'
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
})
