import angular from 'angular';
import uiRouter from 'angular-ui-router';
import dashboardComponent from './dashboard.component';
import chart from './ChartDirective';

let dashboardModule = angular.module('dashboard', [
  uiRouter
])

.directive('chart', chart)

.component('dashboard', dashboardComponent);

export default dashboardModule;
