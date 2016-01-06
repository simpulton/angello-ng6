class UsersModel {
  constructor($http, EndpointConfigService, UtilsService) {
    'ngInject';

    let service = this;
    service.MODEL = '/users/';
    service.$http = $http;
    service.EndpointConfigService = EndpointConfigService;
    service.UtilsService = UtilsService;
  }

  all() {
    let service = this;
    return service.$http.get(service.EndpointConfigService.getUrl(service.MODEL + service.EndpointConfigService.getCurrentFormat()))
            .then(
                function(result) {
                    return service.UtilsService.objectToArray(result);
                }
            );
  };

  fetch(user_id) {
    let service = this;

      return service.$http.get(service.EndpointConfigService.getUrlForId(service.MODEL, user_id));
  };

  create(user) {
    let service = this;

      return service.$http.post(service.EndpointConfigService.getUrl(service.MODEL + service.EndpointConfigService.getCurrentFormat()), user);
  };

  update(user_id, user) {
    let service = this;

      return service.$http.put(service.EndpointConfigService.getUrlForId(service.MODEL, user_id), user);
  };

  destroy(user_id) {
    let service = this;

      return service.$http.delete(service.EndpointConfigService.getUrlForId(service.MODEL, user_id));
  };
}

export default UsersModel;
