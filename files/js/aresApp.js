/**
 * Created by kwhatcher on 4/13/2016.
 */




var app = angular.module('aresApp', ['ngRoute', 'auth0', 'angular-storage', 'angular-jwt'])

    .config( function aresAppConfig ( $routeProvider, authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {
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
            .when('/profile', {
                templateUrl: 'files/partials/profile.html',
            })
            .when('/acorns/:acornId/edit', {
                templateUrl: 'partials/edit.html',
                controller: 'EditController'
            })
            .otherwise({
                redirectTo: '/'
            });
        authProvider.init({
            domain: 'kerryhatcher.auth0.com',
            clientID: 'L77XIIPdRp2Ut7mjG0enQGSgZmyc4bYg'
        });
        jwtInterceptorProvider.tokenGetter = function(store) {
            return store.get('token');
        };

        // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
        // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
        // want to check the delegation-token example
        $httpProvider.interceptors.push('jwtInterceptor');
    })
    .run(function($rootScope, auth, store, jwtHelper, $location) {
        $rootScope.$on('$locationChangeStart', function() {
            if (!auth.isAuthenticated) {
                var token = store.get('token');
                if (token) {
                    if (!jwtHelper.isTokenExpired(token)) {
                        auth.authenticate(store.get('profile'), token);
                    } else {
                        $location.path('/login');
                    }
                }
            }

        });
    });






