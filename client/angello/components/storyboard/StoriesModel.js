class StoriesModel {
  constructor($http, EndpointConfigService, UtilsService) {
    'ngInject';
    let service = this;

    service.MODEL = '/stories/';
    service.$http = $http;
    service.EndpointConfigService = EndpointConfigService;
    service.UtilsService = UtilsService;
  }

  all() {
    let service = this;

      return service.$http.get(service.EndpointConfigService.getUrl(
          service.MODEL + service.EndpointConfigService.getCurrentFormat()))
              .then(
                  function(result) {
                      return service.UtilsService.objectToArray(result);
                  }
              );
  };

  fetch(story_id) {
    let service = this;

      return service.$http.get(
          service.EndpointConfigService.getUrlForId(service.MODEL, story_id)
      );
  };

  create(story) {
    let service = this;

      return service.$http.post(
          service.EndpointConfigService.getUrl(service.MODEL + service.EndpointConfigService.getCurrentFormat()), story
      );
  };

  update(story_id, story) {
    let service = this;

      return service.$http.put(
          service.EndpointConfigService.getUrlForId(service.MODEL, story_id), story
      );
  };

  destroy(story_id) {
    let service = this;

      return service.$http.delete(
          service.EndpointConfigService.getUrlForId(service.MODEL, story_id)
      );
  };
}

export default StoriesModel;
