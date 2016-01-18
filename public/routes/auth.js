'use strict';

//Setting up route
angular.module('mean.users').config(['$httpProvider', 'jwtInterceptorProvider',
  function($httpProvider, jwtInterceptorProvider) {    
        
    jwtInterceptorProvider.tokenGetter = function() {
      return localStorage.getItem('JWT');
    };

    $httpProvider.interceptors.push('jwtInterceptor');
  }
]);
