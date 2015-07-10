'use strict';

angular.module('ngShopList', [])
    .controller('mainCtrl', ['$scope', '$http', 'clientService', 'storageService',
        function($scope, $http, clientService, storageService) {

            $scope.userInput = {};

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
                        storageService.setData('items', JSON.stringify(data));
                    });
            };

            var evalItems = function() {
                if (storageService.getData('items')) {
                    $scope.items = storageService.getData('items');
                } else {
                    var storageItems = JSON.parse(storageService.getData('items'));
                    var serviceItems;

                    clientService.get().then(function(items) {
                        serviceItems = items;
                        var mergedItems = angular.extend(storageItems, serviceItems);
                        $scope.items = mergedItems;
                        storageService.setData('items', mergedItems);
                    });
                };

                evalItems();
            };
        }
    ]);
