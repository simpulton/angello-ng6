class UserController {
  constructor(UsersModel, StoriesModel, $routeParams, $q ) {
   'ngInject';

    let vm = this;

    vm.userId = $routeParams['userId'];
    vm.UsersModel = UsersModel;
    vm.StoriesModel = StoriesModel;
    vm.$q = $q;

    vm.getStoriesForUser();
  }

  getStoriesForUser() {
    let vm = this;
    vm.$q.all([vm.getUser(), vm.getStories()])
      .then(function ([user, stories]) {
        vm.user = user.data;
        vm.stories = vm.getAssignedStories(vm.userId, stories);
      })
  }

  getUser() {
    let vm = this;
      return vm.UsersModel.fetch(vm.userId);
  }

  getStories() {
    let vm = this;
      return vm.StoriesModel.all();
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
