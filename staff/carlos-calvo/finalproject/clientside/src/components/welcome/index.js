import React, {Component, Fragment} from 'react'
import Header from '../header'
import Carrousel from '../carrousel'
import './index.sass'

class Welcome extends Component {


    render() {
        return (
        <Fragment>
            <Header></Header>
            <div className="Carrouselcontainer">
                <Carrousel></Carrousel>
            </div>
      </Fragment>)
    }
}
export default Welcome;