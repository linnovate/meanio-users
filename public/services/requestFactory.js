'use strict';

angular.module('mean.users')

    .factory('RestRequestApi', function ($http) {

        function RestRequestApiKlass() {

        }

        var RestRequestApi = new RestRequestApiKlass();

        RestRequestApiKlass.prototype.getRequest = function (dataRoute) {
            return $http.get('/api/get', {
                params: { dataRoute: dataRoute }
            })
        };

        RestRequestApiKlass.prototype.postRequest = function (dataRoute, data) {
            return $http.post('/api/post', {
                dataRoute: dataRoute,
                data: data
            })
        };

        RestRequestApiKlass.prototype.putRequest = function (dataRoute, data) {
            return $http.put('/api/put', {
                dataRoute: dataRoute,
                data: data
            })
        };

        return RestRequestApi;
    })



