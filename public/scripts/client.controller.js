'use strict';

angular.module('ngShopList', [])
    .controller('mainCtrl', ['$scope', '$http', 'clientService', 'storageService',
        function($scope, $http, clientService, storageService) {

            $scope.userInput = {};

            clientService.get().then(function(items) {
                $scope.items = items;
                console.log(localStorage);
            });

            $scope.addItem = function() {
                clientService.addItem($scope.userInput)
                    .then(function(data) {
                        $scope.userInput = {};
                        $scope.items = data;
                        storageService.setData('items', JSON.stringify(data));
                    });
            };

            $scope.deleteItem = function(id) {
                clientService.delete(id)
                    .then(function(data) {
                        $scope.items = data;
                    });
            };

            var pageRefresh = function() {

            };
        }
    ]);
