'use strict';

function Detail(container) {
    Component.call(this, container);
}

Detail.prototype = Object.create(Component.prototype);
Detail.prototype.constructor = Detail;

Object.defineProperty(Detail.prototype, 'item', {
    set: function(item) {
        var children = this.container.children;
        
        var h2 = children[0];
        h2.innerText = item.title;

        var img = children[1];
        img.src = item.image;

        var p = children[2];
        p.innerText = item.description;

        var span = children[3];
        span.innerText = item.price;
    }
});