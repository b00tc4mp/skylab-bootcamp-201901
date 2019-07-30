import React from 'react'

function LanguageSelector({ onLanguageChange, lang}) {
  return (
    <select
      onChange={e => onLanguageChange(e.target.value)}
      className="language"
      value={lang}
    >
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="ca">Català</option>
      <option value="ga">Galego</option>
    </select>
  );
}

export default LanguageSelector;