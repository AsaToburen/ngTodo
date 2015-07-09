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
                    });
            };

            var evalItems = function() {

                var storageItems = JSON.parse(storageService.getData('items'));
                var serviceItems;

                clientService.get().then(function(items) {
                    serviceItems = items;
                });

                $scope.items = angular.extend(storageItems, serviceItems);

                //storage service .get data items if has items ..... then retrieve items....

                //check local storage if yes get them, as well get them from server for that user. 
                //pull from local storage ... angular.Extend to combine two arrays together. when you have them tog
                //
            };

            evalItems();
        }
    ]);
