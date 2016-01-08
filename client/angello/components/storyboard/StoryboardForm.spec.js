'use strict';

import StoryboardController from './storyboard.controller';

describe('Storyboard form', function() {
    var scope, ctrl;

    beforeEach(inject(function($q, $rootScope, $controller, $templateCache, $compile, $log) {
        var UsersModel = {
            all: function() {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            }
        };

        var StoriesModel = {
            all: function() {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            }
        };

        let STORY_STATUSES, STORY_TYPES;

        scope = $rootScope.$new();

        ctrl = new StoryboardController(
          StoriesModel,
          UsersModel,
          scope,
          $log,
          STORY_STATUSES = {},
          STORY_TYPES = {}
        )

        scope.storyboard = ctrl;

        var templateHtml = $templateCache.get('angello/components/storyboard/storyboard.html');
        var formElem = angular.element(templateHtml);
        $compile(formElem)(scope);

        console.log(templateHtml);

        scope.$digest()
    }));

    it('should be invalid by default', function() {
        expect(ctrl.detailsForm.$invalid).toBeTruthy();
    });

    xit('should be valid with populated fields', function() {
        ctrl.editedStory = {
            title: 'Title',
            status: 'To Do',
            type: 'Enhancement',
            reporter: 'Lukas Ruebbelke',
            assignee: 'Brian Ford'
        };

        scope.$digest();

        expect(ctrl.detailsForm.$valid).toBeTruthy();
    });
});
