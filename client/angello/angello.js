import angular from 'angular';
import ngRoute from 'angular-route';
import angularComponent from 'angular-component';
import 'bootstrap-css-only';
import Common from './common/common';
import Components from './components/components';
import AngelloComponent from './angello.component';
import 'normalize.css';

angular.module('app', [
  ngRoute,
  Common.name,
  Components.name
])

.config(($routeProvider) => {
  "ngInject";

  $routeProvider
    .when('/', {
        templateUrl: 'angello/components/storyboard/storyboard.html',
        // controller: 'StoryboardCtrl',
        // controllerAs: 'storyboard',
        // requiresLogin: true
    })
    .when('/dashboard', {
        templateUrl: 'angello/components/dashboard/dashboard.html',
        // controller: 'DashboardCtrl',
        // controllerAs: 'dashboard',
        // requiresLogin: true
    })
    .when('/users', {
        templateUrl: 'angello/components/users/users.html',
        // controller: 'UsersCtrl',
        // controllerAs: 'users',
        // requiresLogin: true
    })
    .when('/users/:userId', {
        templateUrl: 'angello/components/users/user.html',
        // controller: 'UserCtrl',
        // controllerAs: 'myUser',
        // requiresLogin: true,
        // resolve: {
        //     user: function ($route, $routeParams, UsersModel) {
        //         var userId = $route.current.params['userId']
        //                    ? $route.current.params['userId']
        //                    : $routeParams['userId'];
        //         return UsersModel.fetch(userId);
        //     },
        //     stories: function ($rootScope, StoriesModel) {
        //         return StoriesModel.all();
        //     }
        // }
    })
    .when('/login', {
        templateUrl: 'angello/components/login/login.html',
        // controller: 'LoginCtrl',
        // controllerAs: 'login'
    })
    .otherwise({redirectTo: '/'});
})

.component('app', AngelloComponent);
