import angular from 'angular';
import ngRoute from 'angular-route';
import ngMessages from 'angular-messages';
import angularComponent from 'angular-component';
import 'bootstrap-css-only';
import Common from './common/common';
import Components from './components/components';
import AngelloComponent from './angello.component';
import 'normalize.css';

angular.module('app', [
  ngRoute,
  ngMessages,
  Common.name,
  Components.name
])

.config(($routeProvider) => {
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
        template: '<login></login>',
    })
    .otherwise({redirectTo: '/'});
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
