// public/js/controllers/NerdCtrl.js
angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http) {

    $scope.tagline = 'Nothing beats a pocket protector!';

    var refreshNerds = function() {
        $http
            .get('/api/nerds')
            .success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                //alert("Yay")
                $scope.nerds = data;
            })
            .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert("Shit");
            });
    }

    refreshNerds();

    $scope.newNerd = function(nerdName) {
       $http
         .post("/api/nerds", JSON.stringify({name: nerdName}))
         .success(function() {
           refreshNerds();
         })
         .error(function(data) {
           //scope.msg = "An error occurred " + data;
         });
     };
});