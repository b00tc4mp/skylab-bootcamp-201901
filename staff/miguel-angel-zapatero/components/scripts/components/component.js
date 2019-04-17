'use strict';

function Component(container) {
    this.container = container;
}

Object.defineProperty(Component.prototype, 'visible', {
    set: function (visible) {
        this.container.style.display = visible ? 'block' : 'none';
    }
});