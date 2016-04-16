/**
 * Created by kwhatcher on 4/15/2016.
 */
app.controller('statusPageCtrl', statusController);



function statusController(auth, store, $location, $http) {

    var vm = this;
    vm.auth = auth;
    var x2js = new X2JS();

    vm.sortType     = 'Event'; // set the default sort type
    vm.sortReverse  = false;  // set the default sort order

    function convertXml2JSon(data) {
        return JSON.stringify(x2js.xml_str2json($("#xmlArea").val()))
    }

    function isArray(what) {
        //console.log(what);
        return Object.prototype.toString.call(what) === '[object Array]';
    }

    function appendTransform(defaults, transform) {

        // We can't guarantee that the default transformation is an array
        defaults = angular.isArray(defaults) ? defaults : [defaults]
        // Append the new transformation to the defaults
        return defaults.concat(transform);
    }

    vm.options = {
        // Reset button
        reset: true, // default false

        // Event triggered when selecting a cell
        onChange: function(selected) {
            console.log('selected: ', selected)
        },

        // Prepopulated cells
        selected: ['monday-14', 'monday-15'],

        // When true clicking on the day name it will select the entire row
        disableRowSelection: true, // default false

        // When true clicking on the hour it will select the entire columns
        disableColumnSelection: true // default false
    };


    function getStatusJsonCallBack(data){

        vm.eocstatusoptions = data.data.options;
        vm.eocstatus = data.data.options[data.data.eocstatus];
        console.log(vm.eocstatus);
        console.log(vm.eocstatusoptions);
    }

    function getNWSJsonCallBack(data) {

        var events = [];

            if(isArray(data.data.feed.entry)) {
                // Iterate the array and do stuff
                for(var item in data.data.feed.entry) {
                    events.push(data.data.feed.entry[item]);

                }

            } else {
                // Do another thing
                events.push(data.data.feed.entry);
                //console.log(data.data.feed.entry)
            }

        console.log(events);
        //console.log(data.data);
        vm.nwsxml = events;
    }

    $http.get('files/json/status.json').then(getStatusJsonCallBack);

    $http({
        method  : 'GET',
        url     : window.config.awsurl,
        timeout : 10000,
        params  : {},  // Query Parameters (GET)
        transformResponse: function(data) {

            //var xml= $.parseXML(data);
            var obj = x2js.xml_str2json(data);
            return obj;
        }
    }).then(getNWSJsonCallBack);


};