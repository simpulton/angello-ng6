import angular from 'angular';
import uiRouter from 'angular-ui-router';
import appComponent from './app.component';

let appModule = angular.module('app', [
  uiRouter
])

.component('app', appComponent);

export default appModule;
