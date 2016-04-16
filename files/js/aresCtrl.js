/**
 * Created by kwhatcher on 4/13/2016.
 */

app.controller('MainController', function($scope, auth, store) {
    $scope.eocstatusmsg = "here is a test";
    $scope.firstName = "John";
    $scope.lastName = "Smith";

});

app.controller('RadarController', function($scope, $http) {
    


});

app.directive("footerdirective", function() {

    var controller = ['$scope', '$http', function ($scope, $http, auth, store) {


    }];
    return {
        controller: controller,
        templateUrl:  'files/partials/footer.html'
    };
});

