var rockServices = angular.module('rockServices', ['ngResource'])

rockServices.factory('Rock', ['$resource',
    function($resource) {
        return $resource('rockData/:rockId.json', {}, {
            query: {method:'GET', params:{rockId:'rocks'}, isArray:true}
        })
    }
])
