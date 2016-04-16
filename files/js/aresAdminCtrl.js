/**
 * Created by kwhatcher on 4/15/2016.
 */
(function() {

    'use strict';

    angular
        .module('aresApp')
        .controller('adminpageCtrl', aresAdmin);

    function aresAdmin() {
        return {
            templateUrl: 'files/partials/admin.html',
            controller: toolbarController,
            controllerAs: 'toolbar',
            bindToController: true
        }
    }


// --- Add for updating ---
function getSecureApiClient() {
    var awstoken = store.get('awstoken');

    return apigClientFactory.newClient({
        accessKey: awstoken.AccessKeyId,
        secretKey: awstoken.SecretAccessKey,
        sessionToken: awstoken.SessionToken,
        region: 'us-east-1' // Set to your region
    });
}


    app.controller('MainController', function($scope, auth, store) {
        $scope.eocstatusmsg = "here is a test";
        $scope.firstName = "John";
        $scope.lastName = "Smith";

    });