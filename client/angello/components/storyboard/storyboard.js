import angular from 'angular';
import uiRouter from 'angular-ui-router';
import storyboardComponent from './storyboard.component';

let storyboardModule = angular.module('storyboard', [
  uiRouter
])

.component('storyboard', storyboardComponent);

export default storyboardModule;
