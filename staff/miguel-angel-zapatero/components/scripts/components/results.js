'use strict';

function Results(ul, onItem) {
    Component.call(this, ul);

    this.__onItem__ = onItem;
}

Results.prototype = Object.create(Component.prototype);
Results.prototype.constructor = Results;

Object.defineProperty(Results.prototype, 'items', {
    set: function(items) {
        this.container.innerHTML = '';
        (this.container.firstElementChild);
        items.forEach(function(item) { // id, title, image, price
            var li = document.createElement('li');
            li.setAttribute('data-id', item.id);
            
            var h3 = document.createElement('h3');
            h3.innerText = item.title;
            li.appendChild(h3);
           
            var img = document.createElement('img');
            img.src = item.image;
            li.appendChild(img);

            var span = document.createElement('span');
            span.innerText = item.price;
            li.appendChild(span);

            this.container.appendChild(li);

            li.addEventListener('click', function(){
                this.__onItem__(item.id);
                // this.visible = false;
            }.bind(this));
        }.bind(this));
    }
});