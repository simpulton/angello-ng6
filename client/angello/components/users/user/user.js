import angular from 'angular';
import uiRouter from 'angular-ui-router';
import userComponent from './user.component';

let userModule = angular.module('user', [
  uiRouter
])

.component('user', userComponent);

export default userModule;
