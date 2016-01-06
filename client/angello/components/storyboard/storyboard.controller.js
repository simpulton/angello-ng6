class StoryboardController {
  constructor(
    // StoriesModel, UsersModel,
    $scope, $log, STORY_STATUSES, STORY_TYPES
  ) {
    'ngInject';

    let vm = this;

    vm.name = 'storyboard';

    vm.detailsVisible = true;
    vm.currentStoryId = null;
    vm.currentStory = null;
    vm.editedStory = {};
    vm.stories = [];

    vm.types = STORY_TYPES;
    vm.statuses = STORY_STATUSES;

    vm.users = {};

    // UsersModel.all()
    //   .then(function(result) {
    //     vm.users = (result !== null && result.length > 0) ? result : [{
    //       name: 'Please create a user'
    //     }];
    //     $log.debug('RESULT', result);
    //   }, function(reason) {
    //     $log.debug('REASON', reason);
    //   });

    // $scope.$on('storyDeleted', function() {
    //   vm.getStories();
    //   vm.resetForm();
    // });
    //
    // vm.getStories();
  }

  setCurrentStory(story) {
    var vm = this;
    $log.debug(story);
    vm.currentStoryId = story.id;
    vm.currentStory = story;
    vm.editedStory = angular.copy(vm.currentStory);
  };

  getStories() {
    var vm = this;
    StoriesModel.all()
      .then(function(result) {
        vm.stories = (result !== 'null') ? result : {};
        $log.debug('RESULT', result);
      }, function(reason) {
        $log.debug('REASON', reason);
      });
  };

  createStory() {
    var vm = this;
    StoriesModel.create(vm.editedStory)
      .then(function(result) {
        vm.getStories();
        vm.resetForm();
        $log.debug('RESULT', result);
      }, function(reason) {
        $log.debug('ERROR', reason);
      });
  };

  updateStory() {
    var vm = this;
    var fields = ['title', 'description', 'criteria', 'status', 'type', 'reporter', 'assignee'];

    fields.forEach(function(field) {
      vm.currentStory[field] = vm.editedStory[field]
    });

    StoriesModel.update(vm.currentStoryId, vm.editedStory)
      .then(function(result) {
        vm.getStories();
        vm.resetForm();
        $log.debug('RESULT', result);
      }, function(reason) {
        $log.debug('REASON', reason);
      });
  };

  updateCancel() {
    var vm = this;
    vm.resetForm();
  };

  showMessages(field) {
    var vm = this;
    return vm.detailsForm[field].$touched && vm.detailsForm[field].$invalid;
  };

  resetForm() {
    var vm = this;
    vm.currentStory = null;
    vm.editedStory = {};

    vm.detailsForm.$setPristine();
    vm.detailsForm.$setUntouched();
  };

  setDetailsVisible(visible) {
    var vm = this;
    vm.detailsVisible = visible;
  };

  isEmptyStatus(status) {
    var vm = this;
    var empty = true;
    if (vm.stories) {
      vm.stories.forEach(function(story) {
        if (story.status === status) empty = false;
      });
    }

    return empty;
  };

  insertAdjacent(target, story, insertBefore) {
    var vm = this;
    if (target === story) return;

    var fromIdx = vm.stories.indexOf(story);
    var toIdx = vm.stories.indexOf(target);

    if (!insertBefore) toIdx++;

    if (fromIdx >= 0 && toIdx >= 0) {
      vm.stories.splice(fromIdx, 1);

      if (toIdx >= fromIdx) toIdx--;

      vm.stories.splice(toIdx, 0, story);

      story.status = target.status;
    }
  };

  finalizeDrop(story) {
    var vm = this;
    StoriesModel.update(story.id, story)
      .then(function(result) {
        $log.debug('RESULT', result);
      }, function(reason) {
        $log.debug('REASON', reason);
      });
  };

  changeStatus(story, status) {
    var vm = this;
    story.status = status.name;
  };
}

export default StoryboardController;
