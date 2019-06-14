import React from 'react'
import gif from '../../assets/images/final-message.gif'

function FinalMessage() {
    return (
      <div className="final-message">

      <h1 className="final-message__title">Congratulations</h1>
      <h2 className="final-message__message">You have finished the skylab test</h2>

      <img className="final-message__gif" src={gif} alt="chuck norris gif" />

      <h4 className="final-message__gif" >Skylab staff will contact with you soon!</h4>
      <hr />

    </div>
    )
}

export default FinalMessage