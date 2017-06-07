'use strict';

angular.module('mean.users')
  .controller('AuthCtrl', ['$scope', '$rootScope', '$http', '$state', 'Global', 'RestApi', '$location',
    function ($scope, $rootScope, $http, $state, Global, RestApi, $location) {
      // This object will contain list of available social buttons to authorize
      $scope.socialButtonsCounter = 0;
      $scope.global = Global;
      $scope.$state = $state;

      RestApi.getRequestServerIsAvailable()
        .then(function (response) {
        })
        .catch(function (response) {
          $location.path('/');
        });

      $http.get('/api/get-config')
        .then(function (response) {
          var config = response.data;
          if (config.hasOwnProperty('local')) delete config.local; // Only non-local passport strategies
          $scope.socialButtons = config;
          $scope.socialButtonsCounter = Object.keys(config).length;
        });
    }
  ])
  .controller('LoginCtrl', ['$rootScope', 'MeanUser', 'RestApi', '$location',
    function ($rootScope, MeanUser, RestApi, $location) {
      var vm = this;

       vm.gRecaptchaResponse = '';

      RestApi.getRequestServerIsAvailable()
        .then(function (response) {
        })
        .catch(function (response) {
          $location.path('/');
        });

      // This object will be filled by the form
      vm.user = {};

      vm.input = {
        type: 'password',
        placeholder: 'Password',
        confirmPlaceholder: 'Repeat Password',
        iconClass: '',
        tooltipText: 'Show password'
      };

      vm.togglePasswordVisible = function () {
        vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
        vm.input.placeholder = vm.input.placeholder === 'Password' ? 'Visible Password' : 'Password';
        vm.input.iconClass = vm.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
        vm.input.tooltipText = vm.input.tooltipText === 'Show password' ? 'Hide password' : 'Show password';
      };

      $rootScope.$on('loginfailed', function () {
        vm.loginError = MeanUser.loginError;
      });

      // Register the login() function
      vm.login = function ($rootScope) {
        if (vm.gRecaptchaResponse.length > 1) {
          MeanUser.login(this.user);
        } else {
          vm.loginError = "Passe pelo CAPTCHA para logar.";
        }
      };
    }
  ])
  .controller('RegisterCtrl', ['$rootScope', 'MeanUser', 'RestApi', '$location',
    function ($rootScope, MeanUser, RestApi, $location) {
      var vm = this;

      RestApi.getRequestServerIsAvailable()
        .then(function (response) {
        })
        .catch(function (response) {
          $location.path('/');
        });

      vm.user = {};

      vm.registerForm = MeanUser.registerForm = true;

      vm.input = {
        type: 'password',
        placeholder: 'Password',
        placeholderConfirmPass: 'Repeat Password',
        iconClassConfirmPass: '',
        tooltipText: 'Show password',
        tooltipTextConfirmPass: 'Show password'
      };

      vm.togglePasswordVisible = function () {
        vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
        vm.input.placeholder = vm.input.placeholder === 'Password' ? 'Visible Password' : 'Password';
        vm.input.iconClass = vm.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
        vm.input.tooltipText = vm.input.tooltipText === 'Show password' ? 'Hide password' : 'Show password';
      };
      vm.togglePasswordConfirmVisible = function () {
        vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
        vm.input.placeholderConfirmPass = vm.input.placeholderConfirmPass === 'Repeat Password' ? 'Visible Password' : 'Repeat Password';
        vm.input.iconClassConfirmPass = vm.input.iconClassConfirmPass === 'icon_hide_password' ? '' : 'icon_hide_password';
        vm.input.tooltipTextConfirmPass = vm.input.tooltipTextConfirmPass === 'Show password' ? 'Hide password' : 'Show password';
      };

      // Register the register() function
      vm.register = function () {
        MeanUser.register(this.user);
      };

      $rootScope.$on('registerfailed', function () {
        vm.registerError = MeanUser.registerError;
      });
    }
  ])
  .controller('UpdateCtrl', ['$rootScope', 'MeanUser', 'RestApi', '$location',
    function ($rootScope, MeanUser, RestApi, $location) {
      var vm = this;

      RestApi.getRequestServerIsAvailable()
        .then(function (response) {
        })
        .catch(function (response) {
          $location.path('/');
        });

      vm.user = MeanUser.user;

      vm.registerForm = MeanUser.registerForm = false;

      // Register the update() function
      vm.update = function () {
        MeanUser.update(this.user);
      };

      $rootScope.$on('registerfailed', function () {
        vm.registerError = MeanUser.registerError;
      });
    }
  ])
  .controller('ForgotPasswordCtrl', ['MeanUser', '$rootScope', 'RestApi', '$location',
    function ($rootScope, MeanUser, RestApi, $location) {
      var vm = this;

      RestApi.getRequestServerIsAvailable()
        .then(function (response) {
        })
        .catch(function (response) {
          $location.path('/');
        });

      vm.user = {};
      vm.registerForm = MeanUser.registerForm = false;
      vm.forgotpassword = function () {
        MeanUser.forgotpassword(this.user);
      };
      $rootScope.$on('forgotmailsent', function (event, args) {
        vm.response = args;
      });
    }
  ])
  .controller('ResetPasswordCtrl', ['MeanUser', 'RestApi', '$location',
    function (MeanUser, RestApi, $location) {
      var vm = this;

      RestApi.getRequestServerIsAvailable()
        .then(function (response) {
        })
        .catch(function (response) {
          $location.path('/');
        });

      vm.user = {};
      vm.registerForm = MeanUser.registerForm = false;
      vm.resetpassword = function () {
        MeanUser.resetpassword(this.user);
      };
    }
  ])
  .controller('ChangePasswordCtrl', ['MeanUser', '$rootScope', 'RestApi', '$location',
    function (MeanUser, $rootScope, RestApi, $location) {
      var vm = this;

      RestApi.getRequestServerIsAvailable()
        .then(function (response) {
        })
        .catch(function (response) {
          $location.path('/');
        });

      vm.user = {};
      vm.registerForm = MeanUser.registerForm = false;
      vm.changepassword = function () {
        MeanUser.changepassword(this.user);
      };

      $rootScope.$on('registerfailed', function () {
        vm.registerError = MeanUser.registerError;
      });
    }
  ]);
