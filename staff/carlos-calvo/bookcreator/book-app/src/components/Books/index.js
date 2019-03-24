import React, {Component, Fragment} from 'react'
import './index.sass'
import FlipPage from 'react-flip-page'
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
        this.updateWindowDimensions()
    }

    updateWindowDimensions = ()=> {
        this.setState({ width: window.innerWidth, height: window.innerHeight }, () => {})
        if(this.state.width > 1400) this.interval = 1300///PC Screen
        else if((this.state.width == 1366 && this.state.height == 1024)) this.interval = 1450
        else if(this.state.width > 1000 && this.state.height < 1200) this.interval = 1100
        this.book? this.personalizeContentbywords(this.book, ()=> {}) : this.c=''
        this.forceUpdate()
    }

    componentDidMount = () =>{ //Add the listenner to the screen and 
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions);
        if(this.props.bookid){
            return logic.retrieveBook(this.props.bookid)
                .then(book => {
                    this.book = book
                    this.personalizeContentbywords(this.book, ()=> {})
                    this.setState({title: book.title})
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
    personalizeContentbywords = (book) => { //Substitute param words and split by num of words.
        if(book  && book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('name')) book.content = book.content.replace(/<name>/g, book.parameters.name)
        if(book  && book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('place')) book.content = book.content.replace(/<place>/g, book.parameters.place)
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

    backPage(event){ 
        this.setState({currentPage: this.state.currentPage - 2}, ()=> {})
        this.flipPage.gotoPreviousPage()
        if(this.state.currentPage == 0){
            return  
        } else { //Hide buttons, so currentPage and pageshown matches in case two consecutive clicks.
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

    advancePage(event){
        this.setState({currentPage: this.state.currentPage + 2}, ()=> {})
        this.flipPage.gotoNextPage()
        if((this.state.currentPage >= (this.state.pages.length))){
            return  
        } else { //Hide buttons, so currentPage and pageshown matches in case two consecutive clicks.
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
        return (
            this.state.width && (this.state.width > 700 && this.state.height > 500) ? //For Mobile.
                <Fragment>
                <div className = "coverright">
                    {<div className="book-container">
                            {this.flipPage? //Only in case compo is mounted.
                                    <div className="book-container__controls">
                                        {this.state.currentPage !== 0?
                                        <button className="buttonArrow backPage" onClick={()=>{this.backPage()}}><i className="fas fa-arrow-left"></i></button>
                                        :
                                        <button className="buttonArrow backPage" disabled><i className="fas fa-arrow-left"></i></button>
                                        }
                                        <form>
                                            <input id="range_weight" className ="slider" oninput="range_weight_disp.value = range_weight.value" value={this.state.currentPage} type="range" step="2" onChange={this.goToPage} min="0" max={this.state.pages.length + 2} disabled/>
                                        </form>
                                        {(this.state.currentPage < (this.state.pages.length + 1))?
                                        <button className="buttonArrow advancePage" onClick={()=>{this.advancePage()}}><i className="fas fa-arrow-right"></i></button>
                                        :
                                        <button className="buttonArrow advancePage" disabled><i className="fas fa-arrow-right"></i></button>
                                        }
                                        
                                    </div>
                                    :
                                    <div></div>
                            }
                            <FlipPage
                                ref={(component) => { this.flipPage = component }}
                                height ={0.81*this.state.height}
                                width ={0.85*this.state.width}
                                animationDuration = '600'
                                disableSwipe = 'true'
                                flipOnTouch='false'
                                flipOnTouchZone = '0'
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
                        </div>}
                </div>
                </Fragment>
            :
            <div>
                {this.book ? 
                <div className="book-container__mobile" >
                    <h2>{this.state.title} - Preview</h2>
                    <pre>
                        {this.book.content}
                    </pre>
                </div>
                :
                <div></div>
                }
            </div>
        )
    }    
}
export default Books

