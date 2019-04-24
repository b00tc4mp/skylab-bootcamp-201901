function LanguageSelector({onLanguageChange, lang}) {
    return <select onChange={e => onLanguageChange(e.target.value)} value={lang}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="ca">Català</option>
        <option value="ga">Galego</option>
    </select>
}