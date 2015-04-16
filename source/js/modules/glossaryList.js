angular.module('glossaryList', [
    'ngTouch'
]).

// Grid
controller('glossaryListCtrl', function($scope) {
    $scope.glossary = glossaryData
}).

directive('glossaryList', function() {
    return {
        restrict: 'E',
        controller: 'glossaryListCtrl',
        templateUrl: '/views/glossary-list.html'
    }
})
