import angular from 'angular';
import uiRouter from 'angular-ui-router';
import storyboardComponent from './storyboard.component';
import StoriesModel from './StoriesModel';
import DragAndDrop from './DragAndDrop';

let storyboardModule = angular.module('storyboard', [
  uiRouter
])

.factory('$dragging', DragAndDrop.$dragging)

.directive('dragContainer', DragAndDrop.dragContainer)
.directive('dropContainer', DragAndDrop.dropContainer)
.directive('dropTarget', DragAndDrop.dropTarget)

.controller('DragContainerController', DragAndDrop.DragContainerController)
.controller('DropContainerController', DragAndDrop.DropContainerController)
.controller('DropTargetController', DragAndDrop.DropTargetController)

.service('StoriesModel', StoriesModel)

.component('storyboard', storyboardComponent);

export default storyboardModule;
