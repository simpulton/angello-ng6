import template from './app.html';
import controller from './app.controller';
import './app.styl';

let appComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'main'
};

export default appComponent;
