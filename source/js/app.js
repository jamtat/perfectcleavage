var PerfectClevage = angular.module('PerfectCleavage', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'cordovaService',
    'rockView',
    'rockGrid',
    'glossaryList',
    'quizView',
    'historyView'
])


PerfectClevage.config(function($routeProvider) {
    //$locationProvider.html5Mode(true)

    $routeProvider.
    when('/', {
        templateUrl: '/views/index.html',
        controller: 'indexCtrl'
    }).
    when('/minerals', {
        templateUrl: '/views/rock-home.html',
        controller: 'mineralCtrl'
    }).
    when('/glossary', {
       templateUrl: '/views/glossary.html',
       controller: 'glossaryCtrl'
    }).
    when('/history', {
       templateUrl: '/views/history-home.html',
       controller: 'historyViewCtrl'
    }).
    when('/quiz', {
       templateUrl: '/views/quiz-home.html',
       controller: 'quizCtrl'
    }).
    when('/quiz/:quizId', {
       templateUrl: '/views/quiz.html',
       controller: 'quizViewCtrl'
    }).
    when('/rock/:rockId', {
        templateUrl: '/views/rock-view.html',
        controller: 'rockViewCtrl'
    }).
    otherwise({
        redirectTo: '/'
    })
})

PerfectClevage.controller('mineralCtrl', function($scope) {
    $scope.pageClass = 'home'
})

PerfectClevage.controller('glossaryCtrl', function($scope) {
    $scope.pageClass = 'glossary'
})

PerfectClevage.controller('historyCtrl', function($scope) {
    $scope.pageClass = 'history'
})

PerfectClevage.controller('quizCtrl', function($scope) {
    $scope.pageClass = 'quiz'
    $scope.quizzes = quizData
})

PerfectClevage.controller('indexCtrl', function($scope) {
    $scope.pageClass = 'index'
    Array.prototype.slice.call(document.querySelectorAll('a div[style]'), 0).map(function(el, i) {
        el.style.webkitAnimationDelay = el.style.animationDelay = ((i+1)*0.15 + 1)+'s'
    })
})


PerfectClevage.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});
