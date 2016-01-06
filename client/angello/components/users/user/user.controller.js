class UserController {
  constructor(
     //  user, stories
     $routeParams
   ) {
   'ngInject';

    var vm = this;

    vm.userId = $routeParams['userId'];
    // vm.user = user.data;

    // vm.stories = vm.getAssignedStories(vm.userId, stories);
  }

  getAssignedStories(userId, stories) {
      var assignedStories = {};

      Object.keys(stories, function(key, value) {
          if (value.assignee == userId) assignedStories[key] = stories[key];
      });

      return assignedStories;
  };
}

export default UserController;
