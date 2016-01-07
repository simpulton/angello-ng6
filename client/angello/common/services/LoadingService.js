class LoadingService {
  constructor($rootScope) {
    'ngInject';
    this.$rootScope = $rootScope;
  }

  setLoading(loading) {
    this.$rootScope.loadingView = loading;
  }
}

export default LoadingService;
