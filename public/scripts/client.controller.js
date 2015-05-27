'use strict';

angular.module('ngShopList', [])
    .controller('mainCtrl', ['$scope', '$http', 'clientService',
        function($scope, $http, clientService) {

            $scope.userInput = {};

            clientService.get().then(function(items) {
                $scope.items = items;
            });

            $scope.addItem = function() {
                clientService.addItem($scope.userInput)
                    .then(function(data) {
                        $scope.userInput = {};
                        $scope.items = data;
                    });
            };

            $scope.deleteItem = function(id) {
                clientService.delete(id)
                    .then(function(data) {
                        $scope.items = data;
                    });
            };
        }
    ]);
