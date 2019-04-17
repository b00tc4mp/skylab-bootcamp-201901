'use strict';

/**
 * 
 * @param {*} container 
 * @param {*} literals 
 * @param {*} onLanguageChange 
 * @param {*} onLogOut 
 */
function Home(container, literals, initialLanguage, onLogOut) {
    Component.call(this, container);
    this.__literals__ = literals;

    var logoutButton = container.children[0];
    this.__logOut__ = new LogOut(logoutButton, literals, function () {
        onLogOut();
    });
    this.__logOut__.language = initialLanguage;
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;


Object.defineProperty(Home.prototype, 'language', {
    set: function (language) {
        this.__logOut__.language = language;
    }
});
