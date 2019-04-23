function LanguageSelector(props) {
    return <select onChange={ event => props.onLanguageChange(event.target.value)}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="ca">Català</option>
        <option value="ga">Galego</option>
    </select>
}