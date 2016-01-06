import angular from 'angular';
import uiRouter from 'angular-ui-router';
import usersComponent from './users.component';
import userModule from './user/user';
import UsersModel from './UsersModel';

let usersModule = angular.module('users', [
  uiRouter,
  userModule.name
])

.service('UsersModel', UsersModel)

.component('users', usersComponent);

export default usersModule;
