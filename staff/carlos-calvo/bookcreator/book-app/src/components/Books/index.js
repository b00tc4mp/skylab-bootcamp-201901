import React, {Component, Fragment} from 'react'
import './index.sass'
import FlipPage from 'react-flip-page'
import TwoPages from '../twoPages'
import logic from '../../logic'

class Books extends Component {

    intervalPre =  25
    interval = 1700 
    book = null
    flipPage = null
    

    state = {
        title: '',
        pages : [],
        width: window.innerWidth,
        height: window.innerHeight,
        currentPage : 0
    }

    componentWillMount = () => {
        console.log('willmount')
        console.log(this.state.width, this.state.height)
        this.updateWindowDimensions()
    }

    updateWindowDimensions = ()=> {
        console.log('updateWindowDimensions')
        this.setState({ width: window.innerWidth, height: window.innerHeight }, () => {})
        console.log(this.state.width, this.state.height)
        if(this.state.width > 1400) this.interval = 1400///PC Screen
        else if((this.state.width == 1366 && this.state.height == 1024)) this.interval = 1450
        else if(this.state.width > 1000 && this.state.height < 1200) this.interval = 1200
        else if(this.state.width > 750 && this.state.height < 100) this.interval = 800
        else if(this.state.width < 750 ) this.interval = 1650
        console.log('this.state.width is ' + this.state.width)
        console.log('interval is ' + this.interval)
        this.book? this.personalizeContentbywords(this.book, ()=> {}) : this.c=''
    }

    componentDidMount = () =>{
        
        if(this.props.bookid){
            this.updateWindowDimensions()
            window.addEventListener('resize', this.updateWindowDimensions);
        return logic.retrieveBook(this.props.bookid)
            .then(book => {
                this.book = book
                this.personalizeContentbywords(this.book, ()=> {})
                this.setState({title: book.title})
                // this.pages = this.getArrayconPre(this.book)
                // this.forceUpdate()
            }, () => {})
        } else if(this.props.templateid) {
            return logic.retrieveTemplateBook(this.props.templateid)
            .then(book => {
                this.book = book
                this.personalizeContentbywords(this.book, ()=> {})
                this.setState({title: book.title})
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
        // book.content = book.content.replace(/(\r?\n|\r?\n){2,}/g, '<p><br/><br/></p>')
        // book.content = book.content.replace(/(\r|\n)/g, ' ')
        // let arraysinsaltos = book.content.split("<br/><br/>")
        let texto = book.content
        let arrayreturn = []
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
        let newArray = arrayreturn.map(page => page.replace(/<Chapter>/g, '\n <- - - - - - - - - - - - NEW CHAPTER- - - - - - - - - - - - >\n'))
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

    //Generate

    // generateDivs(){
    //     var x = '';
    //     for(var i = 0; i < this.state.pages.length; i += 2){
    //         var x = x + `<div className="all">
    //             <div className="page1">${this.state.pages[i === 0 ? i : i + 1]}</div>
    //             <div className="page2">${this.state.pages[i === 0 ? i + 1: i + 2]}</div>
    //         </div>`
    //     }
    //     return x
    // }

    backPage(event){ 
        this.setState({currentPage: this.state.currentPage - 2}, ()=> {})
        this.flipPage.gotoPreviousPage()
        if(this.state.currentPage == 0){
            return  
        } else {
            var button = document.getElementsByClassName('advancePage')[0]
            var button1 = document.getElementsByClassName('backPage')[0]
            button.setAttribute('hidden', true)
            button1.setAttribute('hidden', true)
            setTimeout(() =>{
                button.removeAttribute('hidden');
                button1.removeAttribute('hidden');
            }, 600)
            this.forceUpdate()
        }
    }

    advancePage(){
        this.setState({currentPage: this.state.currentPage + 2}, ()=> {})
        this.flipPage.gotoNextPage()
        this.setState({currentPage: this.state.currentPage + 2})
        if(!(this.state.currentPage <= (this.state.pages.length))){
            return  
        } else {
            var button = document.getElementsByClassName('advancePage')[0]
            var button1 = document.getElementsByClassName('backPage')[0]
            button.setAttribute('hidden', true)
            button1.setAttribute('hidden', true)
            setTimeout(() =>{
                button.removeAttribute('hidden');
                button1.removeAttribute('hidden');
            }, 600)
            this.forceUpdate()
        }
    }

    render = () => {

        console.log(this.state.currentPage)
        console.log(this.state.pages.length)
        return (
            <Fragment>
            <div className = "coverright">
                <div className="book-container">
                    <h2> {this.state.title} - Preview</h2>
                            <FlipPage
                                ref={(component) => { this.flipPage = component }}
                                height ={0.77*this.state.height}
                                width ={0.82*this.state.width}
                                animationDuration = '500'
                                disableSwipe = 'true'
                                flipOnTouch='true'
                                pageBackground= 'url(https://image.freepik.com/free-photo/white-paper-background_1154-683.jpg)'
                                orientation='horizontal'
                                className="flip"
                                uncutPages= 'true'
                                >
                            {this.state.pages.length && this.state.pages.map((page,i) => {
                                return <div className="all">
                                   <div className="page1">{this.state.pages[i === 0 ? i : 2*i]}</div>
                                   <div className="page2">{this.state.pages[i === 0 ? i + 1: 2*i + 1]}</div>
                                </div>
                            })}

                            </FlipPage>
                            {this.flipPage?
                            <div>
                                {this.state.currentPage !== 0?
                                <button className="buttonArrow backPage" onClick={()=>{this.backPage()}}><i class="fas fa-arrow-left"></i></button>
                                :
                                <button className="buttonArrow backPage" disabled><i class="fas fa-arrow-left"></i></button>
                                }
                                {(this.state.currentPage <= (this.state.pages.length))?
                                <button className="buttonArrow advancePage" onClick={()=>{this.advancePage()}}><i class="fas fa-arrow-right"></i></button>
                                :
                                <button className="buttonArrow advancePage" disabled><i class="fas fa-arrow-right"></i></button>
                                }
                            </div>
                            :
                            <div></div>
                            }
                </div>
            </div>
            </Fragment>
        )
    }    
}
export default Books

