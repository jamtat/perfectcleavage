angular.module('cordovaService', [])
    .factory('cordovaReady', [function () {
        return function (fn) {
            var queue = [],
                impl = function () {
                    queue.push([].slice.call(arguments));
                };

            document.addEventListener('deviceready', function () {
                queue.forEach(function (args) {
                    fn.apply(this, args);
                });
                impl = fn;
            }, false);

            return function () {
                return impl.apply(this, arguments);
            };
        };
    }]);


var rockServices = angular.module('rockServices', ['ngResource'])

rockServices.factory('Rock', function RockFactory() {
    return {
        get: function(rockId) {
            if(rockId.rockId) {
                rockId = rockId.rockId
            }
            return {
                $promise: {
                    then: function(c) {
                        c(rockData[rockId])
                    }
                }
            }
        },
        query: function() {
            return {
                $promise: {
                    then: function(c) {
                        c(rockData['rocks'])
                    }
                }
            }
        }
    }
})
