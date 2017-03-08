'use strict';

var request = require('request'),
    xml = require('jstoxml'),
    fs = require('fs'),
    nodemailer = require('nodemailer'),
    config = require('meanio').loadConfig(),
    errorTemplate = require('../assets/templates/error');

function sendMail(mailOptions) {
    var transport = nodemailer.createTransport(config.mailer);
    transport.sendMail(mailOptions, function (err, response) {
        if (err) return err;
        return response;
    });
}

function checkStatusCode(statusCode) {
    return statusCode != 200 || statusCode != 201;
}

function mountMailError(response) {
    if (checkStatusCode(response.statusCode)) {
        var mailOptions = {
            to: 'lrodrigues@teste.com.br',
            from: 'lrodrigues@teste.com.br'
        };
        mailOptions = errorTemplate.request_error_email(mailOptions, response.headers.error);
        sendMail(mailOptions);
    }
}

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
                mountMailError(response);
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