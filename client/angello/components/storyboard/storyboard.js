import angular from 'angular';
import uiRouter from 'angular-ui-router';
import storyboardComponent from './storyboard.component';
import StoriesModel from './StoriesModel';

let storyboardModule = angular.module('storyboard', [
  uiRouter
])

.service('StoriesModel', StoriesModel)

.component('storyboard', storyboardComponent);

export default storyboardModule;
