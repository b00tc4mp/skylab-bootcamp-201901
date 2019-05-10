const path = require('path')
const Component = require('../component')

class Results extends Component {
    constructor() {
        super(path.join(__dirname, 'index.html'))
    }

    beforeRender(html, { items }) {
        const lis = items.map(({url, title, image, price}) => `<li><a href="${url}"><h2>${title}</h2><img src="${image}"><span>${price}</span></a></li>`).join('')

        html = html.replace('<items />', lis)

        return html
    }
}

module.exports = Results