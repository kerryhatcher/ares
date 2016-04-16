/**
 * Created by kwhatcher on 4/13/2016.
 */




var app = angular.module('aresApp', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'files/partials/index.html'
            })
            .when('/radar', {
                templateUrl: 'files/partials/radar.html',
                controller: 'RadarController'
            })
            .when('/contact', {
                templateUrl: 'files/partials/contact.html'
            })
            .when('/admin', {
                templateUrl: 'files/partials/admin.html'
            })
            .when('/acorns/:acornId', {
                templateUrl: 'partials/acorn.html',
                controller: 'AcornController'
            })
            .when('/acorns/:acornId/edit', {
                templateUrl: 'partials/edit.html',
                controller: 'EditController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);







