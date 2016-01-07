import TweenMax from 'gsap/src/uncompressed/TweenMax';

let listAreaAnimation = () => {
  return {
    addClass: function (element, className, done) {
        if (className == 'list-area-expanded') {
            TweenMax.to(element, 0.5, {right: 68, onComplete: done });
        }
        else {
            done();
        }
    },
    removeClass: function (element, className, done) {
        if (className == 'list-area-expanded') {
            TweenMax.to(element, 0.5, {right: 250, onComplete: done });
        }
        else {
            done();
        }
    }
  };
}

export default listAreaAnimation;
