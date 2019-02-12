'use strict'
// cómo le entran estos param a esta función - son props establecidas en la llamada
function LanguageSelector({ selectedLanguage, onLanguageSelected, languages }) {
    return (
        <select onChange={onLanguageSelected}>
            {languages.map(language => language === selectedLanguage ?
                <option value={language} selected>{language.toUpperCase()}</option> :
                <option value={language}>{language.toUpperCase()}</option>
            )}
        </select>
    )
}