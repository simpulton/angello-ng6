import template from './storyboard.html';
import controller from './storyboard.controller';
import './storyboard.styl';

let storyboardComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default storyboardComponent;
