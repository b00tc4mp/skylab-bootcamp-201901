import React, {Component, Fragment} from 'react'
import './index.sass'
import logic from '../../logic';
import FlipPage from 'react-flip-page'
import TwoPages from '../twoPages'

class Books extends Component {

    intervalPre =  25
    interval = 1700 
    book = null

    state = {
        title: '',
        pages : [],
        width: 1500,
        heigth: 0
    }

    componentWillMount = () => {
        this.updateWindowDimensions()
    }

    updateWindowDimensions = ()=> {
        this.setState({ width: window.innerWidth, heigth: window.innerHeight }, () => {})
        const {state :{ width } } = this
        if(width > 1400) this.interval = 1700
        if(width > 1200 && width < 1400) this.interval = 1250
        if(width > 1000 && width < 1200) this.interval = 1000
        if(width > 750 && width < 100) this.interval = 800
        if(width < 750 ) this.interval = 600
    }

    componentDidMount = () =>{
        
        if(this.props.bookid){
            this.updateWindowDimensions()
            window.addEventListener('resize', this.updateWindowDimensions);
        return logic.retrieveBook(this.props.bookid)
            .then(book => {
                this.book = book
                this.setState({title: book.title})
                this.personalizeContentbywords(this.book, ()=> {})
                // this.pages = this.getArrayconPre(this.book)
                // this.forceUpdate()
            }, () => {})
        } else if(this.props.templateid) {
            return logic.retrieveTemplateBook(this.props.templateid)
            .then(book => {
                debugger
                this.book = book
                this.setState({title: book.title})
                this.personalizeContentbywords(this.book, ()=> {})
            }, () => {})
        }

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }


    //personalize content by number of words
    personalizeContentbywords = (book) => {
        if(book  && book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('name')) book.content = book.content.replace(/<name>/g, book.parameters.name)
        if(book  && book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('place')) book.content = book.content.replace(/<place>/g, book.parameters.place)
        // book.content = book.content.replace(/(\r?\n|\r?\n){2,}/g, '<br/><br/>')
        // book.content = book.content.replace(/(\r|\n)/g, ' ')
        // let arraysinsaltos = book.content.split("<br/><br/>")
        let texto = book.content
        let arrayreturn = []
        debugger
        let j = 0
        while(this.interval < texto.length) {
            j = 0
            if(texto[this.interval] == ' ' || texto[this.interval] == '\n' || texto[this.interval] == '\r'){
                arrayreturn.push(texto.substring(0, this.interval))
            } else {
                j = 1
                while(texto[this.interval + j] !== ' ' && texto[this.interval + j] !== '\n' && texto[this.interval + j] !== '\r' && texto[this.interval + j] !== '.' && texto[this.interval + j] !== ','){
                    j ++;
                }
                arrayreturn.push(texto.substring(0, this.interval + j))
            }
            texto = texto.substring(this.interval + j, texto.length)
        }
        arrayreturn.push(texto)
        let newArray = arrayreturn.map(page => page.replace(/<Chapter>/g, '\n\n CHAPTER  \n\n'))
        this.setState({pages: newArray}, () => {})

    }
    //personalize content by paragrafs
    // personalizeContentbyParagrah = (book) => {
    //     if(book  && book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('name')) book.content = book.content.replace(/<name>/g, book.parameters.name)
    //     if(book  && book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('place')) book.content = book.content.replace(/<place>/g, book.parameters.place)
    //     // book.content = book.content.replace(/[.]\s\s\n/g, '<br/>')
    //     // book.content = book.content.replace(/[.]\s\n/g, '<br/>')
    //     // book.content = book.content.replace(/[.]\n/g, '<br/>')
    //     // book.content = book.content.replace(/<br><br>/g, '<br/>')
    //     // book.content =  book.content.replace(/<Chapter>/g, 'chapter <br/>')
    //     book.content = book.content.replace(/(\r?\n|\r?\n){2,}/g, '<br/><br/>')
    //     book.content = book.content.replace(/(\r|\n)/g, ' ')
    //     let arrayreturn = []
    //     let i = 0 //Counter para arraysinsaltos
    //     let string = ''
    //     while( i < arraysinsaltos.length){
    //         if(string.length < this.interval) {
    //             string = string.concat(arraysinsaltos[i])
    //             i++
    //         } else {
    //             arrayreturn.push(string)
    //             // console.log(string, string.length)
    //             // console.log('++++++++++++++++++++++++++++++++++++++++++')
    //             string = ''
    //         }
    //     }
    //     arrayreturn.push(string)
    //     let newArray = arrayreturn.map(page => page.replace(/<Chapter>/g, '\n\nCHAPTER  \n\n'))
    //     this.setState({pages: newArray}, () => {})
    // }


    //Contar caracteres (1500)
    //Cogemos y lo pasamos como texto.
    //si hay un ./n -> añadimos <br/>
    //Cuando llegamos a los 1500, miramos cuanto queda hasta el próximo ./n y lo añadimos.
    //Seguimos contando hasta ahí





    // getIndicesOf(searchStr, str) {
    //     console.log('++++++++++++++++++')
    //     console.log(str)
    //     var searchStrLen = searchStr.length;
    //     if (searchStrLen !== 0) {
    //         return [];
    //     }
    //     var startIndex = 0, index, indices = [];
    //     while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    //         indices.push(index);
    //         startIndex = index + searchStrLen;
    //     }
    //     return indices;
    // }

    // getArrayconPre(string, interval){
    //     console.log(arraysinsaltos.length)
    //     let arrayreturn = []
    //     let i = 0
    //     while (i < arraysinsaltos.length){
    //         let arrayparcial = []
    //         let string = ''
    //         for(let j = 0; j < interval; j++){
    //             string = string.concat(arraysinsaltos[i])
    //             string = string.concat('\n')
    //             i++
    //         }
    //         arrayreturn.push(string)            
    //     }

    //     return arrayreturn
    // }

    // advancePage = () => {
    //     if(this.state.pages.length){
    //         let newState = this.state.currentPage + 1
    //         if(newState == this.state.pages.length -1 ) return
    //         this.setState({currentPage: newState})
    //     } else{
    //         return
    //     }
    // }

    // backPage = () => {
    //     if(this.state.pages.length){
    //         let newState = this.state.currentPage - 1
    //         if(newState == -1) return
    //         this.setState({currentPage: newState})
    //     }
    //     else{
    //         return 
    //     }
    // }


    render = () => {
        debugger
        return (
            <Fragment>
            <div className = "coverright">
                <div className="book-container">
                    <h2> {this.state.title}</h2>
                            <FlipPage
                                ref={(FlipPage) => { this.flipPage = FlipPage; }}
                                height ={0.85*this.state.heigth}
                                width ={0.8*this.state.width}
                                showSwipeHint
                                orientation='horizontal'
                                className="flip"
                                >
                            {this.state.pages.length && this.state.pages.map((page,i) => {
                                return <div className="all">
                                   <div className="page1">{this.state.pages[i === 0 ? i : i + 1]}</div>
                                   <div className="page2">{this.state.pages[i === 0 ? i + 1: i + 2]}</div>
                                </div>
                            })}
                            </FlipPage>
                </div>
            </div>
            </Fragment>

        )
    }    

}

export default Books


/*

*/