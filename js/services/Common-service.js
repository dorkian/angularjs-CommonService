'use strict';
myApp.factory('CommonService', function ($http, $q, $window) {
    // Base uri
    const BASE_URI = $window.baseurl.url;
    //variables
    var componentInput = null;
    //explain the methods to avoid rewriting in the service.
    var factory =
    {
        getData: getData,
        postData: postData,
        deleteData: deleteData,
        getComponentInput: getComponentInput,
        setComponentInput: setComponentInput
    }
    return factory;

    //Properties
    function setComponentInput(result) {
        componentInput = result;
    }
    function getComponentInput() {
        return componentInput;
    }
    //Methods
    function getData(url, data, ignore) {
        return httpImpl('GET', url, data);
    }
    function postData(url, data, ignore) {
        return httpImpl('POST', url, data);
    }
    function deleteData(url, data, ignore) {
        return httpImpl('DELETE', url, data);
    }

    function httpImpl(method, url, data, contentType) {
        if (!contentType)
            contentType = 'application/json';
        var deferred = $q.defer();

        var config = {
            method: method,
            url: BASE_URI + url,
            headers: {
                'Content-Type': contentType
            }
        };

        if (method != 'GET')
            if (data)
                config.data = data;

        if (method === 'GET') {
            if (data && data.params)
                config.params = data.params;
        }

        $http(config).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (errResponse) {
                console.error(method + ': Error while call ', BASE_URI + url);
                console.error(method + ': Error: ', errResponse);

                deferred.reject(errResponse);
            }
        );

        return deferred.promise;
    }

});