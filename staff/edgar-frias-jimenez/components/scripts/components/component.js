'use strict';

class Component {
    constructor(container) {
        this.container = container;
    }

    set visible(visible) {
        this.container.style.display = visible ? 'block' : 'none';
    }
}

// function Component(container) {
//     this.container = container;
// }

// Object.defineProperty(Component.prototype, 'visible', {
//     set: function (visible) {
//         this.container.style.display = visible ? 'block' : 'none';
//     }
// });