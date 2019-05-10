const i18n = {
    set language(lang) {
        localStorage.lang = lang
    },

    get language() {
        return localStorage.lang || 'en'
    }
}

export default i18n