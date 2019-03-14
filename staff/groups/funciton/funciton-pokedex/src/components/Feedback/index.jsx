'use strict'

import React from 'react'
import './index.sass'

function Feedback({ message }) {
    return <section className="feedbackAlert"><p className="alert-link">{message}</p></section>
}
export default Feedback
