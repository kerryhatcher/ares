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

app.directive("headerdirective", function() {

    var controller = ['$scope', '$http', function ($scope, $http) {




        function getStatusJsonCallBack(data){
            console.log(data.data.options[data.data.eocstatus]);
            $scope.eocstatus = data.data.options[data.data.eocstatus];
        }

        $http.get('files/json/status.json').then(getStatusJsonCallBack);


    }];
    return {
        controller: controller,
        templateUrl:  'files/partials/header.html'
    };
});

