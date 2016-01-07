import angular from 'angular';
import uiRouter from 'angular-ui-router';
import usersComponent from './users.component';
import userModule from './user/user';
import UsersModel from './UsersModel';
import userStoryDirective from './userStoryDirective';

let usersModule = angular.module('users', [
  uiRouter,
  userModule.name
])

.service('UsersModel', UsersModel)

.directive('userstory', userStoryDirective.directiveFactory)

.component('users', usersComponent);

export default usersModule;
