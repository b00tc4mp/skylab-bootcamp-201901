import React, { Component } from 'react'
import Results from '../Results'
import Slider from '../Slider'

class HomePage extends Component {  

   render () {

        return (
            <div className="homepage">

                    <Slider onSearchItems={this.props.onSearchItems} />

                    {this.props.onResults && 
                            <Results 
                                onResults={this.props.onResults} 
                            />}   
            </div>
        )
   }
}


export default HomePage 