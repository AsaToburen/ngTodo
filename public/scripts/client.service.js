angular.module('ngShopList')
    .factory('clientService', ['$q', '$http',
        function($q, $http) {
            return {
                get: function() {
                    var deferred = $q.defer();

                    $http.get('/api/items').success(function(data) {
                        deferred.resolve(data);
                    }).error(function(e) {
                        console.log('Error: ', e);
                        deferred.reject(e);
                    });
                    return deferred.promise;
                },
                addItem: function(userInput) {
                    var deferred = $q.defer();
                    $http.post('/api/items', userInput)
                        .success(function(data) {
                            deferred.resolve(data);
                        }).error(function(e) {
                            console.log('Error: ', e);
                            deferred.reject(e);
                        });
                    return deferred.promise;
                },
                delete: function(id) {
                    var deferred = $q.defer();
                    $http.delete('/api/items/' + id)
                        .success(function(data) {
                            deferred.resolve(data);
                        }).error(function(e) {
                            console.log('Error: ', e);
                            deferred.reject(e);
                        });
                    return deferred.promise;
                }
            };
        }
    ]);
