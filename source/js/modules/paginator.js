angular.module('paginator', [
    'ngTouch',
    'ngAnimate'
]).

// Paginator
controller('paginatorCtrl', function($scope, $element) {
    this.active = 0
    this.pages = []
    this.buttons = []
    var self = this
    this.onPageClick = function(e) {
        var id = this.getAttribute('page-index')
        self.goToPage(id)
    }
    this.goToPage = function(id) {
        if(!self.pages.length) {
            return
        }
        id = id >= self.pages.length ? self.pages.length-1 : id
        id = id < 0 ? 0 : id

        self.pages.map(function(page) {
            angular.element(page).removeClass('active')
        })
        self.pages[id].classList.add('active')
        self.buttons.map(function(button) {
            angular.element(button).removeClass('active')
        })
        self.buttons[id].classList.add('active')
        self.active = id
    }
    $scope.nextPage = this.nextPage = function() {
        self.goToPage(self.active+1)
    }
    $scope.prevPage = this.prevPage = function() {
        self.goToPage(self.active-1)
    }
}).

directive('paginator', function() {
    return {
        restrict: 'E',
        transclude: true,
        controller: 'paginatorCtrl',
        templateUrl: '/views/paginator.html',
        link: function($scope, $element, $attrs, $ctrl, $transclude) {
            var pagesContainer = $element.find('article'),
                buttonBar = $element[0].querySelector('.paginator-buttons')

            $transclude(function(clone, scope) {
                pagesContainer.append(clone)
            })

            var pages = pagesContainer.children(),
                page = null,
                i = 0

            for(i; i < pages.length; i++) {
                page = pages[i]
                var c = page.children[0]
                if(c && c.title === "Hues" && $scope.rock && !$scope.rock.hues) {
                    continue
                }
                var title = page.title ? page.title : page.children[0].title,
                    d = document.createElement('div')

                d.className = 'paginator-button'
                d.setAttribute('page-index',i)
                d.innerHTML = title
                buttonBar.appendChild(d)
                var button = angular.element(d)
                button.on(isTouchDevice() ? 'touchend': 'click', $ctrl.onPageClick)
                $ctrl.pages.push(page)
                $ctrl.buttons.push(d)
            }
            $ctrl.goToPage(0)
        }
    }
})

function isTouchDevice() {
   var el = document.createElement('div');
   el.setAttribute('ontouchstart', 'return;'); // or try "ontouchstart"
   return ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
   return typeof el.ongesturestart === "function";
}
