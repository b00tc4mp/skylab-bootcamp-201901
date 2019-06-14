import React, {Component, Fragment} from 'react'
import FlipPage from 'react-flip-page'
import './index.sass'
import logic from '../../logic';

class Books extends Component {

    interval = 1500
    pages = []

    componentDidMount = () =>{
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


    render = () => {

        return (
            <div className = "rightsidebar c_updateuser">
                
                    <FlipPage
                        heigth='700'
                        width='700'
                        showSwipeHint
                        orientation='horizontal'
                    >
                        {this.pages.map(page => <div>{page}</div>)}

                    </FlipPage>
                </div>

        )
    }    

}

export default Books