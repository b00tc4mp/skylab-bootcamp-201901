'use strict';

{
    let languageSelected = 'en';

    // ELEMENTOS EXTRAIDOS DE DOCUMENT
    const select = document.getElementsByTagName('select')[0];
    const forms = document.getElementsByTagName('form');
    const sections = document.getElementsByTagName('section');
    const main = document.getElementsByTagName('main')[0];

    // SELECTOR DE IDIOMAS SCRIPTNAME LANGUAGE-SELECTOR
    const languageSelector = new LanguageSelector(select, function (language) {
        languageSelected = language;

        landing.language = language;
        register.language = language;
        login.language = language;
        home.language = language;
    })

    //PRIMERA VENTANA QUE TE DEJA REGISTRARTE O INICIAR SESIÓN
    const landing = new Landing(sections[0], i18n.landing, function () {
        landing.visible = false
        register.visible = true
    }, function () {
        landing.visible = false
        login.visible = true
    })

    // SIGN UP SCRIPT CREATOR COMPONENT NAME SIGN-UP
    const register = new Register(forms[0], function (name, surname, email, password, confirmPassword) {
        try {
            logic.registerUser(name, surname, email, password, confirmPassword, function (error) {
                if (error) return register.error = i18n.errors[languageSelected][error.code]

                register.visible = false
                registerOk.visible = true
            })
        } catch (error) {
            register.error = i18n.errors[languageSelected][error.code]
        }
    }, i18n.register, languageSelected, function () {
        this.__feedback__.visible = false;
    })

    register.visible = false;

    // SIGN UP CONFIRMAtION SCRIPT CREATOR COMPONENT NAME SIGN-UP-OK
    const registerOk = new RegisterOk(sections[1], function () {
        registerOk.visible = false
        login.visible = true
    })

    registerOk.visible = false


    // SIGN IN SCRIPT CREATOR COMPONENT NAME SIGN-IN
    const login = new Login(forms[1], function (email, password) {
        try {
            logic.login(email, password, function (error) {
                if (error) return login.error = i18n.errors[languageSelected][1]

                login.visible = false
                loadUserName()
                home.visible = true
            })
        } catch (error) {
            login.error = i18n.errors[languageSelected][error.code]
        }
    }, i18n.login, languageSelected, function () {
        this.__feedback__.visible = false;
    })

    login.visible = false

    //CREADOR DEL HOME;

    const home = new Home(main, function () {
        logic.logOut()

        updateViewFollowingUserSession()

    }, function (query) {
        logic.searchDucks(query, function (ducks) {
            home.results = ducks.map(function (duck) {
                return {
                    id: duck.id,
                    title: duck.title,
                    image: duck.imageUrl,
                    price: duck.price
                }
            })
        })
    }, function (id) {
        logic.retrieveDucklingDetail(id, function (ducks) {

            home.detail = {
                title: ducks.title,
                image: ducks.imageUrl,
                price: ducks.price,
                description: ducks.description,
            }
        })
    }, i18n.home)

    function updateViewFollowingUserSession() {
        home.visible = logic.isUserLoggedIn
        landing.visible = !logic.isUserLoggedIn
    }

    function loadUserName() {
        logic.retrieveUser(function (error, user) {
            if (error) return login.error = error.message

            home.name = user.name
        })

    }
    if (logic.isUserLoggedIn) loadUserName()

    updateViewFollowingUserSession()

}
