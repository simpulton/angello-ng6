import _StoriesModel_ from '../Storyboard/StoriesModel';
import userStoryDirective from './userStoryDirective';

describe('userstory Directive', function () {
    var userStory,
        StoriesModel,
        $rootScope,
        directive;

    beforeEach(inject(function($q, $compile, _$rootScope_, $log) {
      let directive = userStoryDirective.directiveFactory();
      $rootScope = _$rootScope_;

      StoriesModel = new _StoriesModel_();
      userStory = new directive.controller($rootScope, StoriesModel, $log);

      spyOn(StoriesModel, 'destroy').and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve('data');
          return deferred.promise;
      });

      spyOn($rootScope,'$broadcast').and.callThrough();
    }));

    it('should delete a story', function() {
        userStory.deleteStory('0');

        expect(StoriesModel.destroy).toHaveBeenCalledWith('0');

        $rootScope.$digest();

        expect($rootScope.$broadcast).toHaveBeenCalledWith('storyDeleted');
    });
});
