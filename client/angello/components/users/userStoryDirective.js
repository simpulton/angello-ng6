class controller {
  constructor($rootScope, StoriesModel, $log) {
    'ngInject';
    this.StoriesModel = StoriesModel;
    this.$rootScope = $rootScope;
    this.$log = $log;
  }

  deleteStory(id) {
    let userStory = this;
      userStory.StoriesModel.destroy(id)
      .then(function (result) {
        userStory.$rootScope.$broadcast('storyDeleted');
        userStory.$log.debug('RESULT', result);
      }, function (reason) {
        userStory.$log.debug('ERROR', reason);
      });
    };
};
class userStory {
  constructor() {
      this.restrict = 'A',
      this.controller = controller,
      this.controllerAs = 'userStory'
  }

  static directiveFactory(){
    userStory.instance = new userStory();
    return userStory.instance;
  }
}

export default userStory;
