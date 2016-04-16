/**
 * Created by kwhatcher on 4/15/2016.
 */

(function() {

    'use strict';

    angular
        .module('aresApp')
        .directive('toolbar', toolbar);

    function toolbar() {
        return {
            templateUrl: 'files/partials/header.html',
            controller: toolbarController,
            controllerAs: 'toolbar',
            bindToController: true 
        }
    }

    function toolbarController(auth, store, $location, $http) {

        function getOptionsForRole(isAdmin, token) {
            if(isAdmin) {
                // TODO: update roles and principals based upon your account settings.
                return {
                    "id_token": token,
                    "role": window.config.role,
                    "principal": window.config.principal

                };
            }
            else {
                return {
                    "id_token": token,
                    "role": window.config.role,
                    "principal": window.config.principal
                };
            }
        }

        var vm = this;
        vm.login = login;
        vm.logout = logout;
        vm.auth = auth;

        function getStatusJsonCallBack(data){
            console.log(data.data.options[data.data.eocstatus]);
            vm.eocstatus = data.data.options[data.data.eocstatus];
        }

        $http.get('files/json/status.json').then(getStatusJsonCallBack);

        function login() {
            // The auth service has a signin method that
            // makes use of Auth0Lock. If authentication
            // is successful, the user's profile and token
            // are saved in local storage with the store service
            auth.signin({}, function(profile, token) {

                store.set('profile', profile);
                store.set('token', token);
                // set admin and get delegation token from identity token.
                profile.isAdmin = !profile.identities[0].isSocial;
                var options = getOptionsForRole(profile.isAdmin, token);
                console.log("here test1");

                // TODO: Step 3: Enable this section once you setup AWS delegation.

                 auth.getToken(options)
                 .then(
                 function(delegation)  {

                     store.set('awstoken', delegation.Credentials);
                     $location.path("/");
                 },
                 function(err) {
                    console.log('failed to acquire delegation token', err);
                 });
                 
                // TODO: Step 3: Remove this redirect after you add the get token API.

                $location.path('/');

            }, function(error) {
                console.log(error);
            })
        }

        function logout() {
            // The signout method on the auth service
            // sets isAuthenticated to false but we
            // also need to remove the profile and
            // token from local storage
            auth.signout();
            store.remove('profile');
            store.remove('token');
            $location.path('/');
        }
    }

})();
