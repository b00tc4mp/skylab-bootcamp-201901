const path = require('path')
const Component = require('../component')

class Results extends Component {
    constructor() {
        super(path.join(__dirname, 'index.html'))
    }

    beforeRender(html, { items }) {
        let list = ''
        
        if (items) {
            ducks.forEach(({id, title, imageUrl: image, price}) => {
                list += `<li key="${id}">
                <h2>${title}</h2>
                <img src="${image}">
                <span>${price}</span>
                </li>`
            })
        }
            
        html = html.replace('<list />', ducks ? list : '')

        return html
    }
}

module.exports = Results