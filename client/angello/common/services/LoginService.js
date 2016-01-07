class LoginService {
  constructor($rootScope, auth, store,
            CURRENT_BACKEND, $log, $location, jwtHelper, EndpointConfigService) {
    'ngInject';

    let service = this;

    service.$rootScope = $rootScope;
    service.auth = auth;
    service.store = store;
    service.CURRENT_BACKEND = CURRENT_BACKEND;
    service.$log = $log;
    service.$location = $location;
    service.jwtHelper = jwtHelper;

    service.setLoginCallback();
  }

  setLoginCallback() {
    let service = this;

    if (service.CURRENT_BACKEND === 'firebase') {
      service.loginCallback = function(onLogin, error) {
        return function(profile, token) {
          service.saveUserAndProfile(profile, token);
          service.auth.getToken({
            api: 'firebase'
          }).then(function(token) {
            service.store.set('userToken', token.id_token);
            onLogin(profile, token.id_token);
          }, function(err) {
            error(err);
            service.$log.error("Error getting Firebase token", err);
          });
        }
      };
    } else {
      service.loginCallback = function(onLogin) {
        return function(profile, token) {
          service.saveUserAndProfile(profile, token);
          service.store.set('userToken', token);
          onLogin(profile, token);
        }
      };
    }
  }

  saveUserAndProfile(profile, token) {
    let service = this;

    service.store.set('profile', profile);
    service.$rootScope.$broadcast('onLogin', profile);
    service.$rootScope.$broadcast('onCurrentUserId', profile.user_id);
    service.store.set('id_token', token);
  }

  login(opts, ok, error) {
    let service = this;

      var options = angular.extend({
          closable: false
      }, opts);
      service.auth.signin(options, service.loginCallback(ok, error), error)
  };

  authenticateUser() {
    let service = this;

    if (!service.auth.isAuthenticated) {
      var token = service.store.get('id_token');
      if (!token || service.jwtHelper.isTokenExpired(token)) {
        service.$location.path('/login');
      } else {
        var profile = service.store.get('profile');
        service.auth.authenticate(profile, token);
        service.$rootScope.$broadcast('onCurrentUserId', profile.user_id);
      }
    }
  }

  logout() {
    let service = this;

      service.store.remove('id_token');
      service.store.remove('profile');
      service.store.remove('userToken');
      service.$rootScope.$broadcast('onCurrentUserId', null);
      service.$location.path('/login');
  }

  getCurrentUser() {
    let service = this;

      return service.store.get('profile');
  };

  getCurrentUserId() {
    let service = this;

      var user = service.getCurrentUser();
      return user ? user.user_id : null;
  };
}

export default LoginService;
