// import React, {Component} from 'react'
// import './index.sass'

// class Feedback extends Component {



 

     
//     render() {

//         return <section className="feedbackSearc">
//              <div className="feedbackSearch__box mt-5 ml-5 mr-5">
//                  <h3 className="feedbackSearch__title mt-3">Error</h3>
//                  <p className="error feedbackSearch__message font-weight-bold">{this.props.message}</p>
              
//              </div>
//          </section>
 
     
//     }
// }

// export default Feedback

'use strict'

import React from 'react'
import './index.sass'

function Feedback({ message, level }) {
    return <section className={`feedback ${level ? `feedback--${level}` : ''}`}>{message}</section>
}

export default Feedback
