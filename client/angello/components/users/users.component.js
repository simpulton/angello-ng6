import template from './users.html';
import controller from './users.controller';
import './users.styl';

let usersComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default usersComponent;
