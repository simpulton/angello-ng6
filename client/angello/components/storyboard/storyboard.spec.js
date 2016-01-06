import StoryboardModule from './storyboard'
import StoryboardController from './storyboard.controller';
import StoryboardComponent from './storyboard.component';
import StoryboardTemplate from './storyboard.html';

describe('Storyboard', () => {
  let $rootScope, makeController;

  beforeEach(window.module(StoryboardModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new StoryboardController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(StoryboardTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = StoryboardComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(StoryboardTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(StoryboardController);
      });
  });
});
