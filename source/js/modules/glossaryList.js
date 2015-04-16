angular.module('glossaryList', [
    'ngTouch'
]).

// Grid
controller('glossaryListCtrl', function($scope) {
    $scope.glossary = glossaryData
	console.log(glossaryData)
}).

directive('glossaryList', function() {
    return {
        restrict: 'E',
        controller: 'glossaryListCtrl',
        templateUrl: '/views/glossary-list.html'
    }
})
