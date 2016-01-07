class EndpointConfigService {
  constructor($rootScope, CURRENT_BACKEND) {
    'ngInject';

    let service = this,
        endpointMap = {
            firebase: { URI: 'https://my-first-angello.firebaseio.com/', root: 'clients/', format: '.json' },
            node: { URI: 'http://localhost:4000/', root: 'api/clients/', format: ''}
        }

    service.currentEndpoint = endpointMap[CURRENT_BACKEND];
    service.userId = null;
    service.backend = CURRENT_BACKEND;

    $rootScope.$on('onCurrentUserId', function(event, id){
        service.userId = id;
    });
  }

  getUrl(model) {
    let service = this;
    return service.currentEndpoint.URI + service.currentEndpoint.root + service.userId + model;
  };

  getUrlForId(model, id) {
    let service = this;
    return service.getUrl(model) + id + service.currentEndpoint.format;
  };

  getCurrentBackend() {
    let service = this;

      return service.backend;
  };

  getCurrentFormat() {
    let service = this;

      return service.currentEndpoint.format;
  };

  getCurrentURI() {
    let service = this;

      return service.currentEndpoint.URI;
  };
}

export default EndpointConfigService;
