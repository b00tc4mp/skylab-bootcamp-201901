function LanguageSelector({ onLanguageChange }) {
  return (
    <select
      onChange={e => onLanguageChange(e.target.value)}
      className="language"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="ca">Català</option>
      <option value="ga">Galego</option>
    </select>
  );
}
