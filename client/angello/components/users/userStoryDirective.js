let userStory = ($rootScope, StoriesModel, $log) => {
  'ngInject';

  let controller = function() {
      let userStory = this;
      userStory.deleteStory = function (id) {
        StoriesModel.destroy(id)
            .then(function (result) {
                $rootScope.$broadcast('storyDeleted');
                $log.debug('RESULT', result);
            }, function (reason) {
                $log.debug('ERROR', reason);
            });
      };
  };

  return {
      restrict: 'A',
      controller: controller,
      controllerAs: 'userStory'
  };
}

export default userStory;
