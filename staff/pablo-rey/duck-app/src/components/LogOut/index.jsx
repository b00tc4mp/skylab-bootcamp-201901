import React from 'react'

function LogOut  ({onLogout, literals, selectedLanguage}) {
  return <button className="nav__logout" onClick={onLogout}>{literals[selectedLanguage].logout}</button>;    
}

export default LogOut