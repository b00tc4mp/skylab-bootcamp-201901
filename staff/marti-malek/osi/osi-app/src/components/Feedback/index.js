import React from 'react'
import './index.sass'

function Feedback({ actualError, actualMessage, closeFeedback }) {
    return <section className="feedback">
        {
           actualError ? <div className="feedback__error"><i onClick={() => closeFeedback()} className="feedback__icon fas fa-times"></i><p className="feedback__error__message">{actualError.message ? actualError.message : actualError}</p></div> : null
        }
        {
            actualMessage ? <div className="feedback__warning"><i onClick={() => closeFeedback()} className="feedback__icon fas fa-times"></i><p className="feedback__warning__message">{actualMessage}</p></div> : null
        }
    </section>
}

export default Feedback