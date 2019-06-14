import React, {Component, Fragment} from 'react'
import './index.sass'
import logic from '../../logic';

class Books extends Component {

    interval = 1500
    pages = []
    state = {
        currentPage: 0
    }
    componentWillMount = () =>{
        return logic.retrieveBook(this.props.bookid)
            .then(book => {
                this.pages = this.getArray(book[0].content, this.interval)
                this.forceUpdate()
            }, () => {})
    }

    getArray(string, interval){
        let array = []
        let begin = 0;
        while(begin < string.length){
            if(begin + interval < string.length){
                array.push(string.substring(begin, begin + interval))
            } else {
                array.push(string.substring(begin, string.length-1))
            }
            begin = begin + interval
        }

        return array
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
        console.log('La lognitud es', this.pages.length - 1)
        console.log('La pagina actual es', this.state.currentPage)
        console.log(this.pages[this.state.currentPage])
        let buttonback = 'button'
        let buttonforward = 'button'
        if(this.state.currentPage == 0) buttonback = 'button-disabled'
        if(this.state.currentPage == this.pages.length -1) buttonback = 'button-disabled'
        return (
            <div className = "rightsidebar c_updateuser">
                <div className ="page">
                    <div className="padded-page">
                        <pre>{this.pages[this.state.currentPage]}</pre>
                    </div>
                </div>
            <button className={buttonback} onClick={this.backPage}><i class="fas fa-arrow-left"></i></button>
            <button className={buttonforward} onClick={this.advancePage}><i class="fas fa-arrow-right"></i></button>
            </div>

        )
    }    

}

export default Books