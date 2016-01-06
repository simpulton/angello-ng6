class DashboardController {
  constructor(
    // StoriesModel,
    STORY_STATUSES, STORY_TYPES
  ) {
    'ngInject';

    var vm = this;
    vm.types = STORY_TYPES;
    vm.statuses = STORY_STATUSES;
    vm.stories = [];

    // StoriesModel.all()
    //     .then(function (stories) {
    //         var arr = [];
    //         for (var key in stories) {
    //             arr.push(stories[key]);
    //         }
    //         vm.stories = arr;
    //     });
  }
}

export default DashboardController;
