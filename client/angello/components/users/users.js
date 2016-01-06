import angular from 'angular';
import uiRouter from 'angular-ui-router';
import usersComponent from './users.component';
import userModule from './user/user';

let usersModule = angular.module('users', [
  uiRouter,
  userModule.name
])

.component('users', usersComponent);

export default usersModule;
