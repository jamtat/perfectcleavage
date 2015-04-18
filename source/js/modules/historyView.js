angular.module('historyView', [
    'ngTouch',
    'ngSanitize',
    'paginator'
]).

controller('historyViewCtrl', function($scope) {
	$scope.pageClass = 'history'
	
})
