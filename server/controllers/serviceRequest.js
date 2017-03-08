'use strict';

var request = require('request'),
    xml = require('jstoxml'),
    fs = require('fs'),
    config = require('meanio').loadConfig();
    
module.exports = function (RestRequestApi) {

    var auth = Buffer.from("admin:admin").toString('base64');
    
    function decodeURIFromBase64(pathRoute) {
        return decodeURI(Buffer.from(pathRoute, 'base64').toString());
    }

    function decodeDataFromBase64(data) {
        var dataStringifyed = Buffer.from(data, 'base64').toString();
        return JSON.parse(dataStringifyed);
    }

    return {

        getApi: function (req, res) {
            return request.get({
                url: config.billHost + decodeURIFromBase64(req.query.dataRoute),
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Basic ' + auth
                },
                /*agentOptions: {
                    ca: fs.readFileSync('./config/env/calab2.pem')
                }*/
                rejectUnauthorized: false,
                requestCert: true
            }, function (error, response, body) {
                res.status(response.statusCode).send(body);
            })
        },

        postApi: function (req, res) {
            return request.post({
                url: config.billHost + decodeURIFromBase64(req.body.dataRoute),
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Basic ' + auth
                },
                rejectUnauthorized: false,
                requestCert: true,
                body: decodeDataFromBase64(req.body.data),
                json: true
            }, function (error, response, body) {
                res.status(response.statusCode).json(body);
            })
        },

        putApi: function (req, res) {
            return request.put({
                url: config.billHost + decodeURIFromBase64(req.body.dataRoute),
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Basic ' + auth
                },
                rejectUnauthorized: false,
                requestCert: true,
                body: decodeDataFromBase64(req.body.data),
                json: true
            }, function (error, response, body) {
                res.status(response.statusCode).json(body);
            })
        },

    };
}