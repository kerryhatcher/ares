/**
 * Created by kwhatcher on 4/15/2016.
 */
app.controller('adminpageCtrl', adminController);



    function adminController(auth, store, $location, $http) {

        var vm = this;
        vm.auth = auth;
        

        function getStatusJsonCallBack(data){

            vm.eocstatusoptions = data.data.options;
            vm.eocstatus = data.data.options[data.data.eocstatus];
            console.log(vm.eocstatus);
            console.log(vm.eocstatusoptions);
        }

        $http.get('files/json/status.json').then(getStatusJsonCallBack);


        function getSecureApiClient() {
            var awstoken = store.get('awstoken');

            return apigClientFactory.newClient({
                accessKey: awstoken.AccessKeyId,
                secretKey: awstoken.SecretAccessKey,
                sessionToken: awstoken.SessionToken,
                region: 'us-east-1' // Set to your region
            });
        }

    };