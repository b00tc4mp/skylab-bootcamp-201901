const path = require('path')
const Component = require('../component')

class Results extends Component{
    constructor(){
        super(path.join(__dirname, 'index.html'))
    }

    beforeRender(html, props) {
        const { ducks  } = props
        let ducksResults=[]
        if(ducks){
        ducks.forEach(({id, title, imageUrl: image, price}) => {
            ducksResults += `<li key= ${id}>
                                <h2>${title}</h2>
                                <img src=${image}>
                                <spam>${price}</spam>`
            
        });
    }
        
        html = html.replace('<list />', ducks ? ducksResults : '' )

        return html
    }

}

module.exports= Results