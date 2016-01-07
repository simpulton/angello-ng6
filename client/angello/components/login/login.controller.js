class LoginController {
  constructor($log, LoginService, $location) {
    'ngInject';

    var vm = this;

    LoginService.login({
      container: 'login-container'
    }, function() {
      $location.path('/');
    }, function(error) {
      $log.error("There's an error logging in", error);
    });
  }
}

export default LoginController;
