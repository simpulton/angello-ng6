let $dragging = function() {
    var data = null;
    var type = null;

    return {
        getData: function () {
            return data;
        },
        getType: function () {
            return type;
        },
        setData: function (newData) {
            data = newData;
            return data;
        },
        setType: function (newType) {
            type = newType;
            return type;
        }
    };
}

let dragContainer = function () {
    return {
        restrict: 'A',
        controller: 'DragContainerController',
        controllerAs: 'dragContainer',
        link: function ($scope, $element, $attrs, dragContainer) {
            dragContainer.init($element);

            $element.on('dragstart', dragContainer.handleDragStart.bind(dragContainer));
            $element.on('dragend', dragContainer.handleDragEnd.bind(dragContainer));
            // $element.on('dragenter', dragContainer.handleDragEnter.bind(dragContainer));

            $scope.$watch($attrs.dragContainer, dragContainer.updateDragData.bind(dragContainer));
            $attrs.$observe('mimeType', dragContainer.updateDragType.bind(dragContainer));

            $attrs.$set('draggable', true);
        }
    };
}

class DragContainerController {
  constructor($dragging) {
    'ngInject';
    this.$dragging = $dragging;
  }

  init(el) {
      this.el = el;
  };

  handleDragStart(e) {
      if (e.originalEvent) e = e.originalEvent;

      // console.log('handleDragStart', e);
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.effectAllowed = 'move';

      this.el.addClass('drag-container-active');
      this.dragging = true;

      this.$dragging.setData(this.data);
      this.$dragging.setType(this.type);
  };

  handleDragEnd(e) {
      if (e.originalEvent) e = e.originalEvent;

      angular.element(e.target).removeClass('drag-active');

      this.el.removeClass('drag-container-active');
      this.dragging = false;

      this.$dragging.setData(null);
      this.$dragging.setType(null);
  };

  updateDragData(data) {
      // console.log('this.updateDragData', data);

      this.data = data;

      if (this.dragging) this.$dragging.setData(this.data);
  };

  updateDragType(type) {
      // console.log('this.updateDragType', type);

      this.type = type || 'text/x-drag-and-drop';

      if (this.dragging) this.$dragging.setType(this.type);
  };
}

let dropContainer = function ($document, $parse) {
  'ngInject';
    return {
        restrict: 'A',
        controller: 'DropContainerController',
        controllerAs: 'dropContainer',
        link: function ($scope, $element, $attrs, dropContainer) {
            var bindTo = function (event) {
                return function (e) {
                    return $scope.$apply(function () {
                        return dropContainer['handle' + event](e);
                    });
                };
            };

            var dragEnd = dropContainer.handleDragEnd.bind(dropContainer);
            var handleDragEnter = bindTo('DragEnter');
            var handleDragOver = bindTo('DragOver');
            var handleDragLeave = bindTo('DragLeave');
            var handleDrop = bindTo('Drop');


            dropContainer.init($element, $scope, {
                onDragEnter: $parse($attrs.onDragEnter),
                onDragOver: $parse($attrs.onDragOver),
                onDragLeave: $parse($attrs.onDragLeave),
                onDrop: $parse($attrs.onDrop)
            });

            $element.on('dragenter', handleDragEnter);
            $element.on('dragover', handleDragOver);
            $element.on('dragleave', handleDragLeave);
            $element.on('drop', handleDrop);

            $scope.$watch($attrs.accepts, dropContainer.updateMimeTypes.bind(dropContainer));

            $document.on('dragend', dragEnd);

            $scope.$on('$destroy', function () {
                $document.off('dragend', dragEnd);
            });
        }
    };
}

class DropContainerController {
  constructor($dragging) {
    'ngInject';
    this.targets = {};
    this.validAnchors = 'center top top-right right bottom-right bottom bottom-left left top-left'.split(' ');
    this.$dragging = $dragging;
  }

    init(el, scope, callbacks) {
        this.el = el;
        this.scope = scope;
        this.callbacks = callbacks;
        this.accepts = ['text/x-drag-and-drop'];

        this.el.addClass('drop-container');
    };

    addDropTarget(anchor, dropTarget) {
        if (this.validAnchors.indexOf(anchor) < 0) throw new Error('Invalid anchor point ' + anchor);
        if (this.targets[anchor]) throw new Error('Duplicate drop targets for the anchor ' + anchor);

        this.targets[anchor] = dropTarget;
    };

    removeDropTarget(anchor) {
        if (this.targets[anchor] && this.targets[anchor] === anchor) {
            this.activeTarget = null;
        }

        delete this.targets[anchor];
    };

    updateMimeTypes(mimeTypes) {
        if (!mimeTypes) mimeTypes = ['text/x-drag-and-drop'];
        if (!angular.isArray(mimeTypes)) mimeTypes = [mimeTypes];

        // console.log('this.updateMimeTypes', mimeTypes);

        this.accepts = mimeTypes;
    };

    updateDragTarget(e, skipUpdateTarget) {
        let dropContainer = this;
        if (e.originalEvent) e = e.originalEvent;

        var activeTarget = null;
        var activeAnchor = null;
        var minDistanceSq = Number.MAX_VALUE;

        var prevAnchor = dropContainer.activeAnchor;
        var prevTarget = dropContainer.activeTarget;

        if (!skipUpdateTarget) {
            angular.forEach(dropContainer.targets, function (dropTarget, anchor) {
                var width = dropContainer.el[0].offsetWidth;
                var height = dropContainer.el[0].offsetHeight;
                var anchorX = width / 2;
                var anchorY = height / 2;

                if (anchor.indexOf('left') >= 0) anchorX = 0;
                if (anchor.indexOf('top') >= 0) anchorY = 0;
                if (anchor.indexOf('right') >= 0) anchorX = width;
                if (anchor.indexOf('bottom') >= 0) anchorY = height;

                var distanceSq = Math.pow(anchorX - e.offsetX, 2) + Math.pow(anchorY - e.offsetY, 2);

                if (distanceSq < minDistanceSq) {
                    activeAnchor = anchor;
                    activeTarget = dropTarget;
                    minDistanceSq = distanceSq;
                }
            });
        }

        dropContainer.activeAnchor = activeAnchor;
        dropContainer.activeTarget = activeTarget;

        var eventData = {
            $event: e,
            data: dropContainer.$dragging.getData(),
            anchor: activeAnchor,
            target: activeTarget,
            prevAnchor: prevAnchor,
            prevTarget: prevTarget
        };

        if (prevTarget !== activeTarget) {
            if (prevTarget) {
                dropContainer.el.removeClass('drop-container-active-' + prevAnchor);
                prevTarget.handleDragLeave(eventData);
            }

            if (activeTarget) {
                dropContainer.el.addClass('drop-container-active-' + activeAnchor);
                activeTarget.handleDragEnter(eventData);
            }
        }

        return eventData;
    };

    handleDragEnter(e) {
        if (e.originalEvent) e = e.originalEvent;

        // console.log('handleDragEnter', e, this.accepts, this.$dragging.getType());

        if (!this.accepts || this.accepts.indexOf(this.$dragging.getType()) >= 0) {
            e.preventDefault();
        } else {
            return;
        }

        var eventData = this.updateDragTarget(e);

        this.el.children().css({'pointer-events': 'none'});
        this.el.addClass('drop-container-active');

        if (this.callbacks.onDragEnter) {
            this.callbacks.onDragEnter(this.scope, eventData);
        }
    };

    handleDragOver(e) {
        if (e.originalEvent) e = e.originalEvent;

        // console.log('this.handleDragOver', e);

        if (!this.accepts || this.accepts.indexOf(this.$dragging.getType()) >= 0) {
            e.preventDefault();
        } else {
            return;
        }

        var eventData = this.updateDragTarget(e);

        if (eventData.target) {
            eventData.target.handleDragOver(eventData);
        }

        if (this.callbacks.onDragOver) {
            this.callbacks.onDragOver(this.scope, eventData);
        }
    };

    handleDragLeave(e) {
        if (e.originalEvent) e = e.originalEvent;

        // console.log('this.handleDragLeave', e);

        var eventData = this.updateDragTarget(e, true);

        this.el.children().css({'pointer-events': null});
        this.el.removeClass('drop-container-active');

        if (this.callbacks.onDragLeave) {
            this.callbacks.onDragLeave(this.scope, eventData);
        }
    };

    handleDragEnd(e) {
        // console.log('this.handleDragEnd', e);

        this.el.children().css({'pointer-events': null});
        this.el.removeClass('drop-container-active');
    };

    handleDrop(e) {
        if (e.originalEvent) e = e.originalEvent;

        // console.log('this.handleDrop', e);

        if (!this.accepts || this.accepts.indexOf(this.$dragging.getType()) >= 0) {
            e.preventDefault();
        } else {
            return;
        }

        var eventData = this.updateDragTarget(e);

        if (eventData.target) {
            eventData.target.handleDrop(eventData);
        }

        if (this.callbacks.onDrop) {
            this.callbacks.onDrop(this.scope, eventData);
        }

        this.handleDragEnd(e);
    };
}

let dropTarget = function ($parse) {
  'ngInject';
    return {
        restrict: 'A',
        require: ['^dropContainer', 'dropTarget'],
        controller: 'DropTargetController',
        controllerAs: 'dropTarget',
        link: function ($scope, $element, $attrs, ctrls) {
            var dropContainer = ctrls[0];
            var dropTarget = ctrls[1];
            var anchor = $attrs.dropTarget || 'center';
            var destroy = dropContainer.removeDropTarget.bind(dropContainer, anchor);

            $element.addClass('drop-target drop-target-' + anchor);

            dropTarget.init($element, $scope, {
                onDragEnter: $parse($attrs.onDragEnter),
                onDragOver: $parse($attrs.onDragOver),
                onDragLeave: $parse($attrs.onDragLeave),
                onDrop: $parse($attrs.onDrop),
            });

            dropContainer.addDropTarget(anchor, dropTarget);

            $scope.$on('$destroy', destroy);
        }
    };
}

class DropTargetController {
  constructor() {}

  init(el, scope, callbacks) {
    this.el = el;
    this.scope = scope;
    this.callbacks = callbacks;
  };

  handleDragEnter(eventData) {
    // console.log('this.handleDragEnter', eventData);

    this.el.addClass('drop-target-active');

    if (this.callbacks.onDragEnter) {
      this.callbacks.onDragEnter(this.scope, eventData);
    }
  };

  handleDragOver(eventData) {
    // console.log('this.handleDragOver', eventData);

    if (this.callbacks.onDragOver) {
      this.callbacks.onDragOver(this.scope, eventData);
    }
  };

  handleDragLeave(eventData) {
    // console.log('this.handleDragLeave', eventData);

    this.el.removeClass('drop-target-active');

    if (this.callbacks.onDragLeave) {
      this.callbacks.onDragLeave(this.scope, eventData);
    }
  };

  handleDrop(eventData) {
    // console.log('this.handleDrop', eventData);

    if (this.callbacks.onDrop) {
      this.callbacks.onDrop(this.scope, eventData);
    }
  };
}

export default {$dragging, dragContainer, DragContainerController, dropContainer, DropContainerController, dropTarget, DropTargetController};
