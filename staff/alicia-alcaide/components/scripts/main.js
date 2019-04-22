'use strict'

let languageSelected = 'en'
let __userId__
let __userToken__
let __name__


const select = document.getElementsByTagName('select')[0]
const languageSelector = new LanguageSelector(select, function (language) {
    languageSelected = language

    landing.language = language
    register.language = language
    login.language = language
    home.language = language
});

const sections = document.getElementsByTagName('section');
const landing = new Landing(sections[0], i18n.landing, function () {
    landing.visible = false;
    register.visible = true;
}, function () {
    landing.visible = false;
    login.visible = true;
});

landing.visible = true;

const forms = document.getElementsByTagName('form');

const register = new Register(forms[0], function (name, surname, email, password) {
    try {
        logic.registerUser(name, surname, email, password, 
                (response) => {
                    register.visible = false
                    registerOk.visible = true
                },
                (error) => {
                    // codeError 2 : User already exists
                    const codeError = 2
                    register.error = i18n.errors[languageSelected][codeError]
                }
        )
    } catch (error) {
        register.error = i18n.errors[languageSelected][error.code]
    }
}, i18n.register, languageSelected, function () {
    this.__feedback__.visible = false;
})

register.visible = false


const registerOk = new RegisterOk(sections[1], function () {
    registerOk.visible = false;
    login.visible = true;
});

registerOk.visible = false;


const login = new Login(forms[1], function (email, password) {
    try {
        logic.loginUser(email, password, 
            (responseLogin) => {
                const { data: { id, token } } = responseLogin
                __userId__ = id;
                __userToken__ = token;                                
                logic.retrieveUser(__userId__, __userToken__, 
                    (response) => {
                        const { data: { name } } = response
                        __name__ = name
                        home.name = __name__
                        login.visible = false
                        home.visible = true
                    },
                    (error) => {
                        // codeError 7 : Internal error
                        const codeError = 7
                        login.error = i18n.errors[languageSelected][codeError]
                    }
                )
            },
            (error) => {
                // codeError 1 : Wrong credentials
                const codeError = 1
                login.error = i18n.errors[languageSelected][codeError]
            }
        )
    } catch (error) {
        login.error = i18n.errors[languageSelected][error.code]
    }
}, i18n.login, languageSelected, function () {
    this.__feedback__.visible = false;
})

login.visible = false


const main = document.getElementsByTagName('main')[0];
const home = new Home(main, 
    () => {
        logic.logoutUser();
        home.__results__.visible = false
        home.__detail__.visible = false
        home.visible = false;
        landing.visible = true;
    }, 
    (query) => {
        logic.searchDucks(query, 
            (ducks) => {
                home.results = ducks.map(function (duck) {
                    return {
                        id: duck.id,
                        title: duck.title,
                        image: duck.imageUrl,
                        price: duck.price
                    }
                });
            },
            (ducksError) => {
                home.__results__.visible = false
                home.__detail__.visible = false
                // error code 4 : There are not results for this query
                const errorCode = 4
                home.error = i18n.errors[languageSelected][errorCode]
            }
        )
    }, 
    (duckId) => {
        logic.retrieveDuck(duckId, 
            (duck) => {
                home.detail = {
                    title: duck.title,
                    image: duck.imageUrl,
                    description:duck.description,
                    price: duck.price
                }
            },
            (duckError) => {
                home.__detail__.visible = false
                // error code 4 : There are not results for this query
                const errorCode = 4
                home.error = i18n.errors[languageSelected][errorCode]
            }
        )
    }
)

home.visible = false;