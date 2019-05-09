function render(body) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Carme web-app</title>
        <link rel="icon" href="https://thumbs.dreamstime.com/z/cara-negra-del-gato-del-dibujo-de-esquema-con-las-patas-91671447.jpg">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        ${body}
    </body>
    </html>`
}

module.exports = render