import React, {Component, Fragment} from 'react'
import './index.sass'
import logic from '../../logic';
import FlipPage from 'react-flip-page'

class Books extends Component {

    intervalPre =  25
    interval = 2400
    flipPage = null
    
    book = null
    state = {
        title: '',
        currentPage: 0,
        pages : [],
        width: 0,
        heigth: 0
    }

    updateWindowDimensions = ()=> {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    componentDidMount = () =>{
        if(this.props.bookid){
            this.updateWindowDimensions()
            window.addEventListener('resize', this.updateWindowDimensions);
        return logic.retrieveBook(this.props.bookid)
            .then(book => {
                this.book = book
                this.setState({title: book.title})
                this.personalizeContent(this.book, ()=> {})
                // this.pages = this.getArrayconPre(this.book)
                // this.forceUpdate()
            }, () => {})
        } else {
            debugger
            return logic.retrieveTemplateBook(this.props.templateid)
            .then(book => {
                this.book = book
                this.setState({title: book.title})
                this.personalizeContent(this.book, ()=> {})
                // this.pages = this.getArrayconPre(this.book)
                // this.forceUpdate()
            }, () => {})
        }

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    personalizeContent = (book) => {

        if(book  && book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('name')) book.content = book.content.replace(/<name>/g, book.parameters.name)
        if(book  && book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('place')) book.content = book.content.replace(/<place>/g, book.parameters.place)
        // book.content = book.content.replace(/[.]\s\s\n/g, '<br/>')
        // book.content = book.content.replace(/[.]\s\n/g, '<br/>')
        // book.content = book.content.replace(/[.]\n/g, '<br/>')
        // book.content = book.content.replace(/<br><br>/g, '<br/>')
        // book.content =  book.content.replace(/<Chapter>/g, 'chapter <br/>')
        book.content = book.content.replace(/(\r?\n|\r?\n){2,}/g, '<br/><br/>')
        book.content = book.content.replace(/(\r|\n)/g, ' ')
        let arraysinsaltos = book.content.split("<br/><br/>")
        let arrayreturn = []
        let i = 0 //Counter para arraysinsaltos
        let string = ''
        while( i < arraysinsaltos.length){
            if(string.length < this.interval) {
                string = string.concat(arraysinsaltos[i])
                i++
            } else {
                arrayreturn.push(string)
                // console.log(string, string.length)
                // console.log('++++++++++++++++++++++++++++++++++++++++++')
                string = ''
            }
        }
        arrayreturn.push(string)
        let newArray = arrayreturn.map(page => page.replace(/<Chapter>/g, '\n\nCHAPTER  \n\n'))
        this.setState({pages: newArray}, () => {})
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

    advancePage = () => {
        if(this.state.pages.length){
            let newState = this.state.currentPage + 1
            if(newState == this.state.pages.length -1 ) return
            this.setState({currentPage: newState})
        } else{
            return
        }
    }

    backPage = () => {
        if(this.state.pages.length){
            let newState = this.state.currentPage - 1
            if(newState == -1) return
            this.setState({currentPage: newState})
        }
        else{
            return 
        }
    }


    render = () => {
        let isMobile = (this.state.width < 400)
        console.log()
        return (
            
            <Fragment>
            <div className = "coverright">
                <div className="book-container">
                    <h2> {this.state.title}</h2>
                            <FlipPage
                                ref={(FlipPage) => { this.flipPage = FlipPage; }}
                                heigth ={1*this.state.heigth}
                                width ={0.8*this.state.width}
                                showSwipeHint
                                orientation='horizontal'
                                className="flip"
                                >
                            {this.state.pages.length && this.state.pages.map((page,i) => {
                                return <p>{page}</p>
                            })}
                            </FlipPage>
                </div>
            </div>
            </Fragment>

        )
    }    

}

export default Books