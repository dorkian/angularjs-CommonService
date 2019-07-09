'use strict';
myApp.controller('SomeController', function ($scope, CommonService) {
    $scope.init = () => {
        fetchGetData(1);
        loadData({ testInput1: 'sth', testInput2: 'sth' });
    }
    function fetchGetData($Id) {
        //prepare the URL & input for get method
        var url = 'backendController/getDataById';
        var input = { params: { id: $Id } };
        //Call service
        CommonService.getData(url, input)
            .then(function (data) {
                console.log('This would be your get result : ', data);
            },
                function (errResponse) {
                    //any how you want to show error to client
                }
            );
    }
    function loadData($input) {
        var url = 'backendController/loadDataByObject';
        //Call service
        CommonService.postData(url, $input)
            .then(function (data) {
                console.log('This would be your post result : ', data);
            },
                function (errResponse) {
                    //any how you want to show error to client
                }
            );
    }
});