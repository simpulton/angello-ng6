import template from './user.html';
import controller from './user.controller';
import './user.styl';

let userComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default userComponent;
