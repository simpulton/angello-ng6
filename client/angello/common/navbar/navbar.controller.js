class NavbarController {
  constructor($scope, $location, LoginService) {
    'ngInject';
    let vm = this;

    vm.currentUser = null;
    vm.LoginService = LoginService;

    $scope.$on('onCurrentUserId', function (ctx, id) {
        vm.currentUser = LoginService.getCurrentUser();
    });

  }

  logout() {
    let vm = this;

    vm.LoginService.logout();
    vm.currentUser = null;
  };
}

export default NavbarController;
