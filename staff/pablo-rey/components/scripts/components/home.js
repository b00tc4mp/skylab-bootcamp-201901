'use strict';

/**
 * 
 * @param {*} container 
 * @param {*} literals 
 * @param {*} onLanguageChange 
 * @param {*} onLogOut 
 */
function Home(container, literals, onLanguageChange, onLogOut) {
    Component.call(this, container);

    var logoutButton = container.children[0];
    var logOut = new LogOut(logoutButton, function () {
        onLogOut();
    });
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;