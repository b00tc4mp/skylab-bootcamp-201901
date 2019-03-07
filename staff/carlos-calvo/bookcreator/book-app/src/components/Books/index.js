import React, {Component, Fragment} from 'react'
import './index.sass'
import logic from '../../logic';

class Books extends Component {

    intervalPre =  25
    pages = []

    state = {
        currentPage: 0
    }
    componentWillMount = () =>{
        return logic.retrieveBook(this.props.bookid)
            .then(book => {
                let personalizedText = this.personalizeContent(book[0].content, book[0].parameters)
                this.pages = this.getArrayconPre(personalizedText, this.interval)
                this.forceUpdate()
            }, () => {})
    }

    personalizeContent(str, parameters){
        if(parameters.name) str = str.replace(/<name>/g, parameters.name)
        if(parameters.place)str = str.replace(/<place>/g, parameters.place)
        str = str.replace(/\n/g, '<br>')
        str = str.replace(/.<br>/,'<br/>')
        str = str.replace(/<br>/g, '') 
        str = str.replace(/<Chapter>/g, 'chapter')
        console.log(str)
        return str
    }


    //Contar caracteres (1500)
    //Cogemos y lo pasamos como texto.
    //si hay un ./n -> añadimos <br/>
    //Cuando llegamos a los 1500, miramos cuanto queda hasta el próximo ./n y lo añadimos.
    //Seguimos contando hasta ahí





    // getIndicesOf(searchStr, str) {
    //     console.log('++++++++++++++++++')
    //     console.log(str)
    //     var searchStrLen = searchStr.length;
    //     if (searchStrLen == 0) {
    //         return [];
    //     }
    //     var startIndex = 0, index, indices = [];
    //     while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    //         indices.push(index);
    //         startIndex = index + searchStrLen;
    //     }
    //     return indices;
    // }

    getArrayconPre(string, interval){
        // let arraysinsaltos = string.split("<br/>")
        // console.log(arraysinsaltos.length)
        let arrayreturn = []
        // let i = 0
        // while (i < arraysinsaltos.length){
        //     let arrayparcial = []
        //     let string = ''
        //     for(let j = 0; j < interval; j++){
        //         string = string.concat(arraysinsaltos[i])
        //         string = string.concat('\n')
        //         i++
        //     }
        //     arrayreturn.push(string)            
        // }

        return arrayreturn
    }

    advancePage = () => {
        let newState = this.state.currentPage + 1
        if(newState == this.pages.length -1 ) return
        this.setState({currentPage: newState})
    }

    backPage = () => {
        let newState = this.state.currentPage - 1
        if(newState == -1) return
        this.setState({currentPage: newState})
    }


    render = () => {
        let buttonback = 'button'
        let buttonforward = 'button'
        if(this.state.currentPage == 0) buttonback = 'button-disabled'
        if(this.state.currentPage == this.pages.length -1) buttonback = 'button-disabled'
        return (
            <div className = "rightsidebar c_updateuser">
                <div className ="page">
                    <div className="padded-page">
                        <p>{this.pages[this.state.currentPage]}</p>
                    </div>
                </div>
            <button className={buttonback} onClick={this.backPage}><i class="fas fa-arrow-left"></i></button>
            <button className={buttonforward} onClick={this.advancePage}><i class="fas fa-arrow-right"></i></button>
            </div>

        )
    }    

}

export default Books