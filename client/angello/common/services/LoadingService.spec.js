import _LoadingService_ from './LoadingService';

let LoadingService;

describe('Loading Service', function () {
    let $rootScope;

    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        LoadingService = new _LoadingService_($rootScope);
    }));

    it('should update $rootScope to false when setLoading is set to false',
        function () {
            LoadingService.setLoading(false);
            expect($rootScope.loadingView).toEqual(false);
    });

    it('should update $rootScope to true when setLoading is set to true',
        function () {
            LoadingService.setLoading(true);
            expect($rootScope.loadingView).toEqual(true);
    });
});
