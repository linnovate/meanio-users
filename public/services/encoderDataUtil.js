'use strict';

angular.module('mean.users')

    .factory('EncoderDataUtil', function () {

        function EncoderDataUtilKlass() {

        }

        var EncoderDataUtil = new EncoderDataUtilKlass();

        EncoderDataUtilKlass.prototype.encodeURIToBase64 = function (pathRoute) {
            return encodeURI(Buffer.from(pathRoute).toString('base64'));
        }

        EncoderDataUtilKlass.prototype.encodeDataToBase64 = function (data) {
            var dataStringifyed = JSON.stringify(data);
            return Buffer.from(dataStringifyed).toString('base64');
        }
        return EncoderDataUtil;
    })