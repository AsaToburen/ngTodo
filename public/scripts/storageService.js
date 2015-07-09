'use strict';

angular.module('ngShopList')
    .factory('storageService', ['$window', '$log',
        function($window, $log) {
            return {
                setData: function(key, val) {
                    $window.localStorage.setItem(key, val);
                    $log.log('set ' + key + ' data: ' + val);
                    return this;
                },
                getData: function(key) {
                    $log.log('retreiving ' + key + ' data');
                    return $window.localStorage.getItem(key);
                }
            };
        }
    ]);
