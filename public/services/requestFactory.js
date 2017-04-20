'use strict';

angular.module('mean.users')

    .factory('RestApi', function ($http) {

        function RestApiKlass() {

        }

        var RestApi = new RestApiKlass();

        RestApiKlass.prototype.getRequest = function (dataRoute) {
            return $http.get('/api/get', {
                params: { dataRoute: dataRoute }
            })
        };

        RestApiKlass.prototype.getRequestServerIsAvailable = function () {
            return $http.get('/api/checkServerBillIsAvailable', {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            })
        };

        RestApiKlass.prototype.postRequest = function (dataRoute, data) {
            return $http.post('/api/post', {
                dataRoute: dataRoute,
                data: data
            })
        };

        RestApiKlass.prototype.putRequest = function (dataRoute, data) {
            return $http.put('/api/put', {
                dataRoute: dataRoute,
                data: data
            })
        };

        return RestApi;
    })



