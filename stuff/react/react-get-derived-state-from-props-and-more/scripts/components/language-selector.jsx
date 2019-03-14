'use strict';

(() => {
    function LanguageSelector({ selectedLanguage, onLanguageSelected, languages }) {
        return <section className="language-selector">
            <select onChange={onLanguageSelected} value={selectedLanguage}>
                {languages.map(language => <option key={language} value={language}>{language.toUpperCase()}</option>)}
            </select>
        </section>
    }

    modules.export('language-selector', LanguageSelector)
})()