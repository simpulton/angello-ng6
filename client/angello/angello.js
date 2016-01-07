import angular from 'angular';
import ngRoute from 'angular-route';
import ngMessages from 'angular-messages';
import 'auth0-angular';
import angularJwt from 'angular-jwt';
import angularStorage from 'angular-storage';
import angularComponent from 'angular-component';
import 'bootstrap-css-only';
import Common from './common/common';
import Components from './components/components';
import AngelloComponent from './angello.component';
import 'normalize.css';

angular.module('app', [
  ngRoute,
  ngMessages,
  'auth0',
  angularJwt,
  angularStorage,
  Common.name,
  Components.name
])

.config(($routeProvider, $httpProvider, $provide,
  authProvider, CURRENT_BACKEND, jwtInterceptorProvider) => {
  "ngInject";

  $routeProvider
    .when('/', {
        template: '<storyboard></storyboard>',
        requiresLogin: true
    })
    .when('/dashboard', {
        template: '<dashboard></dashboard>',
        requiresLogin: true
    })
    .when('/users', {
        template: '<users></users>',
        requiresLogin: true
    })
    .when('/users/:userId', {
        template: '<user></user>',
        requiresLogin: true,
        resolve: {
            user: function ($route, $routeParams, UsersModel) {
                var userId = $route.current.params['userId']
                           ? $route.current.params['userId']
                           : $routeParams['userId'];
                return UsersModel.fetch(userId);
            },
            stories: function ($rootScope, StoriesModel) {
                return StoriesModel.all();
            }
        }
    })
    .when('/login', {
        template: '<login></login>',
    })
    .otherwise({redirectTo: '/'});

  // Auth0 Authentication
  authProvider.init({
      domain: 'angello.auth0.com',
      clientID: 'Fq8hKAkghu45WpnqrYTc6dbvXhBUdP7l'
  });

  // Loading interceptor
  $httpProvider.interceptors.push('loadingInterceptor');

  // Request interceptor
  if (CURRENT_BACKEND === 'firebase') {
    jwtInterceptorProvider.authPrefix = '';
  }

  jwtInterceptorProvider.tokenGetter = function(store) {
    'ngInject';
    return store.get('userToken');
  };

  $httpProvider.interceptors.push('jwtInterceptor');

  // Decorator
  // Use the `decorator` solution to substitute or attach behaviors to
  // original service instance; @see angular-mocks for more examples....
  $provide.decorator('$log', function ($delegate) {
      // TODO Extract this into a utility service
      function timeStamp() {
          // Create a date object with the current time
          var now = new Date();

          // Create an array with the current month, day and time
          var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

          // Create an array with the current hour, minute and second
          var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

          // Determine AM or PM suffix based on the hour
          var suffix = ( time[0] < 12 ) ? "AM" : "PM";

          // Convert hour from military time
          time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

          // If hour is 0, set it to 12
          time[0] = time[0] || 12;

          // If seconds and minutes are less than 10, add a zero
          for (var i = 1; i < 3; i++) {
              if (time[i] < 10) {
                  time[i] = "0" + time[i];
              }
          }

          // Return the formatted string
          return date.join("/") + " " + time.join(":") + " " + suffix;
      }

      // Save the original $log.debug()
      var debugFn = $delegate.debug;

      $delegate.debug = function () {
          // Prepend timestamp
          arguments[0] = timeStamp() + ' - ' + arguments[0];

          // Call the original with the output prepended with formatted timestamp
          debugFn.apply(null, arguments)
      };

      return $delegate;
  });
})

.factory('loadingInterceptor', function (LoadingService) {
  'ngInject';
    var loadingInterceptor = {
        request: function (config) {
            LoadingService.setLoading(true);
            return config;
        },
        response: function (response) {
            LoadingService.setLoading(false);
            return response;
        }
    };
    return loadingInterceptor;
})

.run(function ($rootScope, LoadingService, LoginService) {
    'ngInject';
    $rootScope.$on('$routeChangeStart', function (e, curr, prev) {
        LoadingService.setLoading(true);
    });

    $rootScope.$on('$routeChangeSuccess', function (e, curr, prev) {
        LoadingService.setLoading(false);
    });

    $rootScope.$on('$locationChangeStart', function() {
      LoginService.authenticateUser();
    });
})

.value('STORY_STATUSES', [
    {name: 'To Do'},
    {name: 'In Progress'},
    {name: 'Code Review'},
    {name: 'QA Review'},
    {name: 'Verified'}
])

.value('STORY_TYPES', [
    {name: 'Feature'},
    {name: 'Enhancement'},
    {name: 'Bug'},
    {name: 'Spike'}
])

.component('app', AngelloComponent);
