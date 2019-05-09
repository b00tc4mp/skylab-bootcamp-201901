const logic = require('./logic')
const literals = require('./i18n')

function render(body, url) {
    url = url || '';
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <nav class="nav">
       <form class="language__container" action="/changeLanguage/${url}">
          <select
            onChange="this.form.submit()"
            class="language"
            name="language"
            id="language"
          >
            <option value="en" ${literals.language === 'en' ? 'selected' : ''}>English</option>
            <option value="es" ${literals.language === 'es' ? 'selected' : ''}>Español</option>
            <option value="ca" ${literals.language === 'ca' ? 'selected' : ''}>Català</option>
            <option value="ga" ${literals.language === 'ga' ? 'selected' : ''}>Galego</option>
          </select>
          ${logic.isUserLoggedIn ? `<LogOut
            onLogout="onLogout()"
            literals=${literals.logout}
            selectedLanguage=${literals.selectedLanguage}
          />`: ''}
        </form>
      </nav>
      ${body}
    </body>
    </html>`
}

module.exports = render