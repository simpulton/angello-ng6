class UsersController {
  constructor(UsersModel, $log) {
    'ngInject';

    let vm = this;

    vm.newUser = { name: '', email: '' };
    vm.users = {};

    vm.UsersModel = UsersModel;
    vm.$log = $log;

    vm.getUsers();
  }

  showMessages(field) {
    let vm = this;
    return vm.newUserForm[field].$touched || vm.newUserForm.$submitted;
  };

  resetForm() {
    let vm = this;

    vm.newUserForm.$setPristine();
    vm.newUserForm.$setUntouched();
  };

  getUsers() {
    let vm = this;
    vm.UsersModel.all()
      .then(function (result) {
          vm.users = (result !== 'null') ? result : {};
          vm.$log.debug('RESULT', result);
      }, function (reason) {
          vm.$log.debug('ERROR', reason);
      });
  };

  addUser() {
    let vm = this;

    vm.UsersModel.create(angular.copy(vm.newUser))
      .then(function (result) {
          vm.getUsers();
          vm.newUser = { name: '', email: '' };
          vm.resetForm();
          vm.$log.debug('RESULT', result);
      }, function (reason) {
          vm.$log.debug('ERROR', reason);
      });
  };

  updateUser(id, user) {
    let vm = this;

    if (vm.userForm.$valid) {
      vm.UsersModel.update(id, user)
          .then(function (result) {
              vm.$log.debug('RESULT', result);
          }, function (reason) {
              vm.$log.debug('ERROR', reason);
          });
    }
  };

  removeUser(id) {
    let vm = this;
    
    vm.UsersModel.destroy(id)
      .then(function (result) {
          vm.getUsers();
          vm.$log.debug('RESULT', result);
      }, function (reason) {
          vm.$log.debug('ERROR', reason);
      });
  };
}

export default UsersController;
