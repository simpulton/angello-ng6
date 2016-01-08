import '../../angello';
import ngRoute from 'angular-route';

describe('User Route', function () {
    var $route,
        $rootScope,
        $location,
        url = 'login';

    // Inject and assign the $route and $rootScope services.
    // Put the template in template cache.

    beforeEach(window.module('ngRoute'));
    beforeEach(window.module('angello'));

    beforeEach(inject(function (_$location_, _$route_, $templateCache, _$rootScope_) {
        $route = _$route_;
        $rootScope = _$rootScope_;
        $location = _$location_;

        $templateCache.put('src/angello/login/tmpl/login.html', '');
    }));

    it('should be defined with correct controller and templateUrl', function() {
        $location.path(url);
        $rootScope.$digest();

        expect($route.current.locals.$template).toEqual('<login></login>');
    });
});
