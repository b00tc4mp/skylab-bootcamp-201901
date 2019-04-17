'use strict';

function Home(section) {
    Component.call(this, section);
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;