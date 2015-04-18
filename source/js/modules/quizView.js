angular.module('quizView', [
    'ngTouch',
	'ngRoute'
]).

// Grid
controller('quizViewCtrl', function($scope, $routeParams) {
    $scope.quiz = quizData.filter(function(q) {
		return q.title === $routeParams.quizId
	})[0]
	var questions = $scope.quiz.questions = $scope.quiz.questions.map(function(q,i) {
		q.i = i
		return q
	})
	$scope.answers = questions.map(function(a){return 0})


	$scope.checkAnswers = this.checkAnswers = function() {
		var answers = $scope.answers.slice(0)
		var correctAnswers = questions.map(function(q) {
			return q.c
		})
		var correct = answers.map(function(a, i) {
			return a === correctAnswers[i]
		})
		var totalScore = correct.reduce(function(a,b) {
			return a+b
		})
		$scope.score = totalScore
	}
}).

controller('quizQuestionCtrl', function($scope) {

}).

directive('quizQuestion', function() {
    return {
        restrict: 'E',
        controller: 'quizQuestionCtrl',
        templateUrl: '/views/quiz-question.html'
    }
})
