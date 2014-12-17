// public/js/controllers/NerdCtrl.js
angular.module('NerdCtrl', ['NerdService']).controller('NerdController', function($scope, $http, Nerd) {

    $scope.tagline = 'Nothing beats a pocket protector!';

    var refreshNerds = function() {
        Nerd
            .get()
            .success(function(data, status, headers, config) {
                $scope.nerds = data;
            })
            .error(function(data, status, headers, config) {
                // TODO: Handle gracefully
                alert("Error: " + JSON.stringify(data));
            });

        //$scope.nerds = returnData;
    };

    $scope.newNerd = function(nerdName) {
       Nerd
         .create({name: nerdName})
         .success(function() {
            refreshNerds();
         })
         .error(function(data) {
            // TODO: Handle gracefully
            alert("Error: " + JSON.stringify(data));
         });
     };

    $scope.deleteNerd = function(id) {
        Nerd
            .delete(id)
            .success(function(data) {
                refreshNerds();
            })
            .error(function(data) {
                // TODO: Handle gracefully
                alert("Error: " + JSON.stringify(data));
            })
    };

    refreshNerds();
});