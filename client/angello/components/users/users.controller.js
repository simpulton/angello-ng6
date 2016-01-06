class UsersController {
  constructor(
    // UsersModel,
    $scope, $log, $timeout
  ) {
    'ngInject';

    var vm = this;

    vm.newUser = { name: '', email: '' };
    vm.users = {};

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
    // UsersModel.all()
    //   .then(function (result) {
    //       vm.users = (result !== 'null') ? result : {};
    //       $log.debug('RESULT', result);
    //   }, function (reason) {
    //       $log.debug('ERROR', reason);
    //   });
  };

  addUser() {
    // UsersModel.create(angular.copy(vm.newUser))
    //   .then(function (result) {
    //       vm.getUsers();
    //       vm.newUser = { name: '', email: '' };
    //       resetForm();
    //       $log.debug('RESULT', result);
    //   }, function (reason) {
    //       $log.debug('ERROR', reason);
    //   });
  };

  updateUser(id, user) {
    // if (vm.userForm.$valid) {
    //   UsersModel.update(id, user)
    //       .then(function (result) {
    //           $log.debug('RESULT', result);
    //       }, function (reason) {
    //           $log.debug('ERROR', reason);
    //       });
    // }
  };

  removeUser(id) {
    // UsersModel.destroy(id)
    //   .then(function (result) {
    //       vm.getUsers();
    //       $log.debug('RESULT', result);
    //   }, function (reason) {
    //       $log.debug('ERROR', reason);
    //   });
  };
}

export default UsersController;
